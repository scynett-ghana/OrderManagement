import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  trigger,
  animate,
  transition,
  style,
  query
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

export interface Products {
  productName: string;
  productValue: string;
}

export interface Countries {
  countryName: string;
  countryValue: string;
}

export interface AddedProducts {
  productName: string;
  pricePerKilo: string;
  quantity: string;
  kilosNeeded: string;
  subTotal: string;
  amount: number;
}

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  showCustomPrice = false;
  defaultParameter = '';
  showInvoice = false;
  displayedColumns: string[] = [
    'productName',
    'pricePerKilo',
    'quantity',
    'kilosNeeded',
    'subTotal',
    'amount'
  ];
  productList: Products[] = [
    { productName: 'Tomatoes', productValue: '2' },
    { productName: 'Mangoes', productValue: '3' }
  ];

  countries: Countries[] = [
    { countryName: 'Ghana', countryValue: '2' },
    { countryName: 'Moroco', countryValue: '3' }
  ];

  addedProducts: AddedProducts[] = [
    {
      productName: 'Ginger',
      pricePerKilo: '2',
      quantity: '1',
      kilosNeeded: '10',
      subTotal: '100',
      amount: 200
    },
    {
      productName: 'Onions',
      pricePerKilo: '3',
      quantity: '2',
      kilosNeeded: '20',
      subTotal: '200',
      amount: 300
    },
    {
      productName: 'Pepper',
      pricePerKilo: '4',
      quantity: '5',
      kilosNeeded: '50',
      subTotal: '600',
      amount: 700
    },
    {
      productName: 'Mushrooms',
      pricePerKilo: '8',
      quantity: '10',
      kilosNeeded: '100',
      subTotal: '1000',
      amount: 2999
    }
  ];

  tourDaysList: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  customPriceToggle() {
    this.showCustomPrice = !this.showCustomPrice;
  }

  customerInvoiceToggle() {
    this.showInvoice = !this.showInvoice;
  }

  /** Gets the total cost of all Added Products. */
  getTotalCost() {
    return this.addedProducts
      .map(t => t.amount)
      .reduce((acc, value) => acc + value, 0);
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.defaultParameter = params.get('id');
      console.log(this.defaultParameter);
    });
  }
}
