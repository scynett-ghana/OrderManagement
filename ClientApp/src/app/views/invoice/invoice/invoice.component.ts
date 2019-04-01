import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from '@angular/material';
import { Router } from '@angular/router';

export interface InvoiceData {
  invoiceId: number;
  customerName: string;
  purchaseDate: string;
  totalAmount: string;
  amountPaid: string;
  status: string;
  referenceNumber: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  displayedColumns: string[] = [
    'invoiceId',
    'customerName',
    'purchaseDate',
    'totalAmount',
    'amountPaid',
    'status',
    'referenceNumber',
    'action'
  ];

  dataSource: MatTableDataSource<InvoiceData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productInvoices: InvoiceData[] = [
    {
      invoiceId: 2,
      customerName: 'John Doe',
      purchaseDate: '12-12-2019',
      totalAmount: '2500',
      amountPaid: '2000',
      status: 'Open',
      referenceNumber: '224'
    },
    {
      invoiceId: 3,
      customerName: 'Johnny Doe',
      purchaseDate: '12-12-2020',
      totalAmount: '2509',
      amountPaid: '2008',
      status: 'Open',
      referenceNumber: '225'
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.productInvoices);
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

  addInvoice() {}
}
