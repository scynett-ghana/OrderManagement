import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
  MatDialogRef
} from '@angular/material';
import { Router } from '@angular/router';
import { OpenInvoiceDialogComponent } from './open-invoices-details.component';

export interface CustomerOpenInvoice {
  invoiceID: string;
  purchaseDate: string;
  totalAmount: string;
  amountPaid: string;
  status: string;
}

@Component({
  selector: 'app-customer-details-open-invoice',
  templateUrl: './customer-details-open-invoice.component.html',
  styleUrls: ['./customer-details-open-invoice.component.scss']
})
export class CustomerDetailsOpenInvoiceComponent implements OnInit {
  openInvoiceDialogBox: MatDialogRef<OpenInvoiceDialogComponent>;
  displayedColumns: string[] = [
    'invoiceID',
    'purchaseDate',
    'totalAmount',
    'amountPaid',
    'status'
  ];
  dataSource: MatTableDataSource<CustomerOpenInvoice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customerOpenInvoices: CustomerOpenInvoice[] = [
    {
      invoiceID: '1',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '2',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '3',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '4',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '5',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '6',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.customerOpenInvoices);
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

  customerEditViewDetails(specifiedUrl: string, customerId: string) {
    if (specifiedUrl === '/view') {
      this.router.navigate(['/customer/details', customerId]);
    } else {
      this.router.navigate(['/customer/form', customerId]);
    }
  }

  openInvoiceDialog() {
    this.openInvoiceDialogBox = this.dialog.open(OpenInvoiceDialogComponent, {
      width: '800px'
    });
  }

  customerDeleteDetails() {}
}
