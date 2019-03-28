import { AddProductDialogComponent } from './add-products-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';

export interface ProductData {
  productId: number;
  productName: string;
  pricePerKilo: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'productName', 'pricePerKilo'];

  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productLists: ProductData[] = [
    {
      productId: 1,
      productName: 'Shea Butter',
      pricePerKilo: '250'
    },
    {
      productId: 2,
      productName: 'Shea Butter',
      pricePerKilo: '250'
    },
    {
      productId: 3,
      productName: 'Shea Butter',
      pricePerKilo: '250'
    },
    {
      productId: 4,
      productName: 'Shea Butter',
      pricePerKilo: '250'
    },
    {
      productId: 5,
      productName: 'Shea Butter',
      pricePerKilo: '250'
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.productLists);
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

  addProduct(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px'
    });
  }
}
