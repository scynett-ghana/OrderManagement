import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyDetails = {};
  constructor(private adminService: AdminService) {}
  ngOnInit() {
    this.adminService.viewCompanyDetails().subscribe((result: any) => {
      this.companyDetails = result[0];
      console.log(this.companyDetails[0]);
    });
  }
}
