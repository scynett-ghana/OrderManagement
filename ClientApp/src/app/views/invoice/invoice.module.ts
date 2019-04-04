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
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule
} from '@angular/material';
import { PrintInvoiceComponent } from './invoice/print-invoice/print-invoice.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoicePaymentComponent } from './invoice/invoice-payment/invoice-payment.component';

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
  },
  {
    path: 'form',
    component: InvoiceFormComponent
  },
  {
    path: 'form/:id',
    component: InvoiceFormComponent
  },
  {
    path: 'details/:id',
    component: InvoiceDetailsComponent
  },
  {
    path: 'payment/:id',
    component: InvoicePaymentComponent
  }
];

@NgModule({
  declarations: [
    InvoiceComponent,
    PrintInvoiceComponent,
    InvoiceFormComponent,
    InvoiceDetailsComponent,
    InvoicePaymentComponent
  ],
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ]
})
export class InvoiceModule {}
