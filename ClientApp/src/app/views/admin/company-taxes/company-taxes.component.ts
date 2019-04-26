import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { Taxes } from '../company.model';

@Component({
  selector: 'app-company-taxes',
  templateUrl: './company-taxes.component.html',
  styleUrls: ['./company-taxes.component.scss']
})
export class CompanyTaxesComponent implements OnInit {
  actionButton = true;

  taxStatus = [
    {
      id: 1,
      value: true
    },
    {
      id: 2,
      value: false
    }
  ];

  displayedColumns: string[] = ['taxName', 'taxRate', 'taxSelect', 'actions'];

  dataSource: MatTableDataSource<Taxes>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  taxLists: Taxes;
  addTaxForm: FormGroup;
  taxForm: Taxes;
  taxId: '';
  initialize: any;
  taxData: Taxes;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.createTaxForm();
  }

  ngOnInit() {
    this.getTaxes();
  }

  createTaxForm(data?: Taxes) {
    this.taxForm = new Taxes(data);
    this.addTaxForm = this.formBuilder.group({
      name: [this.taxForm.name],
      rate: [this.taxForm.rate],
      selected: [this.taxForm.selected]
    });
  }

  getTaxes() {
    this.adminService.viewTaxDetails().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      console.log(result);
      this.taxLists = result;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSubmit() {
    if (this.taxData.id) {
      this.onUpdateTax();
    } else {
      this.onAddNewTax();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddNewTax() {
    this.adminService
      .addTaxDetails(this.addTaxForm.value)
      .subscribe((result: any) => {
        this.getTaxes();
        this.createTaxForm();
      });
  }

  onUpdateTax() {
    this.adminService
      .updateTaxDetails(this.taxData.id, this.addTaxForm.value)
      .subscribe((result: any) => {
        this.getTaxes();
      });
  }

  onCancel() {
    this.actionButton = true;
    this.createTaxForm();
  }

  editTax(selectedTaxData: Taxes) {
    this.taxData = selectedTaxData;
    console.log(selectedTaxData);
    this.createTaxForm(selectedTaxData);
    this.actionButton = false;
  }

  deleteTax(selectedTaxId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
