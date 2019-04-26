import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../products.model';

import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ProductsService } from '../products.service';

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
  productForm: FormGroup;
  product = new Products();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductsService
  ) {
    this.dataSource = new MatTableDataSource(this.productLists);
  }

  onSubmit() {
    this.productService.addProduct(this.productForm.value).subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit() {
    this.createProductForm();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name],
      pricePerKilo: [this.product.pricePerKilo]
    });
  }
}
