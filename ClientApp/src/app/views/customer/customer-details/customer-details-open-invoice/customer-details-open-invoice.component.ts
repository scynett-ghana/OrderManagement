import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

export interface CustomerOpenInvoice {
  productName: string;
  pricePerKilo: string;
  quantity: string;
  kilosNeeded: string;
  subTotal: string;
  amount: string;
}

@Component({
  selector: 'app-customer-details-open-invoice',
  templateUrl: './customer-details-open-invoice.component.html',
  styleUrls: ['./customer-details-open-invoice.component.scss']
})
export class CustomerDetailsOpenInvoiceComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'pricePerKilo',
    'quantity',
    'kilosNeeded',
    'subTotal',
    'amount'
  ];
  dataSource: MatTableDataSource<CustomerOpenInvoice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customerOpenInvoices: CustomerOpenInvoice[] = [
    {
      productName: 'Mango',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: '700'
    },
    {
      productName: 'Pineapple',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: '700'
    },
    {
      productName: 'Water',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: '700'
    },
    {
      productName: 'Pawpaw',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: '700'
    },
    {
      productName: 'Orange',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: '700'
    }
  ];

  constructor(private router: Router) {
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

  customerDeleteDetails() {}
}
