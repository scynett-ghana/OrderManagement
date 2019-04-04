import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTaxesComponent } from './admin-taxes/admin-taxes.component';
import { Routes } from '@angular/router';

const adminRouter: Routes = [
  {
    path: 'form',
    component: AdminTaxesComponent
  },
  {
    path: 'view',
    component: AdminTaxesComponent
  },
  {
    path: 'taxes',
    component: AdminTaxesComponent
  }
];

@NgModule({
  declarations: [ AdminTaxesComponent],
  imports: [CommonModule]
})
export class AdminModule {}
