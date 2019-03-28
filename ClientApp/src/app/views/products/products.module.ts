import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatTabsModule,
  MatDialogModule
} from '@angular/material';
import { AddProductDialogComponent } from './products/add-products-dialog.component';

const productsRoute: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'list',
    component: ProductsComponent
  }
];

@NgModule({
  declarations: [ProductsComponent, AddProductDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoute),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule
  ],
  entryComponents: [AddProductDialogComponent]
})
export class ProductsModule {}
