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
  company: Company;
  companyDetails: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}
  companyForm: FormGroup;

  ngOnInit() {
    this.createCompanyForm();
    this.adminService.viewCompanyDetails().subscribe((result: any) => {
      this.companyDetails = result;
      this.createCompanyForm(this.companyDetails[0]);
      console.log(this.companyDetails[0]);
    });
  }

  createCompanyForm(data?: Company) {
    this.company = new Company(data);
    this.companyForm = this.formBuilder.group({
      name: [this.company.name],
      email: [this.company.email],
      phone: [this.company.phone],
      town: [this.company.town],
      street: [this.company.street],
      country: [this.company.country],
      zip: [this.company.zip]
    });
  }

  onSubmit() {
    this.adminService
      .updateCompanyDetails(this.companyForm.value)
      .subscribe((result: any) => {
        console.log(result);
      });
  }
}
