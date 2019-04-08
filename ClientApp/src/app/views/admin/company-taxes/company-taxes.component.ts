import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

export interface TaxData {
  taxId: number;
  taxName: string;
  taxRate: string;
  taxSelect: boolean;
}

@Component({
  selector: 'app-company-taxes',
  templateUrl: './company-taxes.component.html',
  styleUrls: ['./company-taxes.component.scss']
})
export class CompanyTaxesComponent implements OnInit {
  displayedColumns: string[] = ['taxName', 'taxRate', 'taxSelect', 'actions'];

  dataSource: MatTableDataSource<TaxData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  taxLists: TaxData[] = [
    {
      taxId: 1,
      taxName: 'Vat',
      taxRate: '1.20',
      taxSelect: true
    },
    {
      taxId: 2,
      taxName: 'Tas',
      taxRate: '1.90',
      taxSelect: false
    },
    {
      taxId: 3,
      taxName: 'Tofill',
      taxRate: '20',
      taxSelect: true
    },
    {
      taxId: 4,
      taxName: 'Skell',
      taxRate: '2',
      taxSelect: true
    },
    {
      taxId: 5,
      taxName: 'Dwel',
      taxRate: '50',
      taxSelect: false
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.taxLists);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editTax(selectedTaxId: number) {
    this.router.navigate(['/admin/taxes/' + selectedTaxId]);
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
