import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { Routes, RouterModule } from '@angular/router';
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
import { PrintInvoiceComponent } from './invoice/print-invoice/print-invoice.component';

const invoiceRoute: Routes = [
  {
    path: '',
    component: InvoiceComponent
  },
  {
    path: 'list',
    component: InvoiceComponent
  },
  {
    path: 'print/:id',
    component: PrintInvoiceComponent
  }
];

@NgModule({
  declarations: [InvoiceComponent, PrintInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(invoiceRoute),
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
  ]
})
export class InvoiceModule {}
