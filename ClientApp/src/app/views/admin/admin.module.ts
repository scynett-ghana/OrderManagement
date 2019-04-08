import { AdminService } from './admin.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyTaxesComponent } from './company-taxes/company-taxes.component';
import {
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatTabsModule,
  MatSlideToggleModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const adminRouter: Routes = [
  {
    path: 'view',
    component: CompanyDetailsComponent
  },
  {
    path: 'form',
    component: CompanyFormComponent
  },
  {
    path: 'taxes',
    component: CompanyTaxesComponent
  },
  {
    path: 'taxes/:id',
    component: CompanyTaxesComponent
  }
];

@NgModule({
  declarations: [
    CompanyDetailsComponent,
    CompanyFormComponent,
    CompanyTaxesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRouter),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [AdminService]
})
export class AdminModule {}
