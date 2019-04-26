import { CustomerService } from './../../customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details-customer-details',
  templateUrl: './customer-details-customer-details.component.html',
  styleUrls: ['./customer-details-customer-details.component.scss']
})
export class CustomerDetailsCustomerDetailsComponent implements OnInit {
  customerId: number;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  customerDetails: any = {};

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.customerId = this.route.snapshot.params['id'];
      this.customerService
        .getCustomerDetails(this.customerId)
        .subscribe((result: any) => {
          this.customerDetails = result;
          console.log(this.customerDetails);
        });
    }
  }
}
