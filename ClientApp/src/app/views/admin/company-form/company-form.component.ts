import { AdminService } from './../admin.service';
import { Company } from './../company.model';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  company = new Company();
  constructor(
    private formBuilder: FormBuilder,
    private companyService: AdminService
  ) {}
  companyForm: FormGroup;

  ngOnInit() {
    this.createCompanyForm();
  }

  createCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name: [this.company.companyName],
      email: [this.company.companyEmail],
      phone: [this.company.companyPhone],
      town: [this.company.companyTown],
      street: [this.company.companyStreet],
      country: [this.company.companyCountry],
      zip: [this.company.comapanyZip]
    });
  }

  onSubmit() {
    this.companyService
      .updateCompany(this.companyForm.value)
      .subscribe((result: any) => {
        console.log('Success');
      });
  }
}
