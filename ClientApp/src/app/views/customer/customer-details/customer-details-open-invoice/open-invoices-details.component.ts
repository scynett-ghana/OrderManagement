import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface CustomerOpenInvoice {
  productName: string;
  pricePerKilo: string;
  quantity: string;
  kilosNeeded: string;
  subTotal: string;
  amount: number;
}

@Component({
  templateUrl: './open-invoices-details.html',
  styleUrls: ['./customer-details-open-invoice.component.scss']
})
export class OpenInvoiceDialogComponent {
  displayedColumns: string[] = [
    'productName',
    'pricePerKilo',
    'quantity',
    'kilosNeeded',
    'subTotal',
    'amount'
  ];
  dataSource: MatTableDataSource<CustomerOpenInvoice>;

  customerOpenInvoices: CustomerOpenInvoice[] = [
    {
      productName: 'Mango',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: 700
    },
    {
      productName: 'Pineapple',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: 700
    },
    {
      productName: 'Water',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: 700
    },
    {
      productName: 'Pawpaw',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: 700
    },
    {
      productName: 'Orange',
      pricePerKilo: '23',
      quantity: '60',
      kilosNeeded: '100',
      subTotal: '300',
      amount: 700
    }
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.customerOpenInvoices);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {}

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.customerOpenInvoices
      .map(t => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }
}
