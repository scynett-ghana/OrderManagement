import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface CustomerData {
  customerId: number;
  customerName: string;
}

export interface ProductData {
  productId: number;
  productName: string;
}

export interface InvoiceData {
  productName: string;
  pricePerKilo: string;
  quantity: string;
  kilosNeeded: number;
  subTotal: number;
  amount: number;
}

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'pricePerKilo',
    'quantity',
    'kilosNeeded',
    'subTotal',
    'amount'
  ];

  dataSource: MatTableDataSource<InvoiceData>;

  customerDetails: CustomerData[] = [
    { customerId: 2, customerName: 'Johnny' },
    { customerId: 3, customerName: 'Sunny' },
    { customerId: 4, customerName: 'Rakia' }
  ];

  invoiceDetails: InvoiceData[] = [
    {
      productName: 'Milk',
      pricePerKilo: '24',
      quantity: '55',
      kilosNeeded: 10,
      subTotal: 100,
      amount: 1100
    },
    {
      productName: 'Pawpaw',
      pricePerKilo: '25',
      quantity: '60',
      kilosNeeded: 20,
      subTotal: 200,
      amount: 1200
    },
    {
      productName: 'Bread',
      pricePerKilo: '26',
      quantity: '70',
      kilosNeeded: 30,
      subTotal: 300,
      amount: 1300
    }
  ];

  productDetails: ProductData[] = [
    { productId: 1, productName: 'Mango' },
    { productId: 2, productName: 'Orange' },
    { productId: 3, productName: 'Pineapple' },
    { productId: 4, productName: 'Apple' }
  ];

  getTotalCost() {
    return this.invoiceDetails
      .map(t => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  constructor() {
    this.dataSource = new MatTableDataSource(this.invoiceDetails);
  }

  ngOnInit() {}
}
