import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface InvoiceData {
  productName: string;
  pricePerKilo: string;
  quantity: string;
  kilosNeeded: number;
  subTotal: number;
  amount: number;
}

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'pricePerKilo',
    'quantity',
    'kilosNeeded',
    'subTotal',
    'amount'
  ];

  dataSource: MatTableDataSource<InvoiceData>;

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
