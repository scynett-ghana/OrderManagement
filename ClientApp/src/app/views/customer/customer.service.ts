import { Customer } from './customer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerEndPoint = environment.baseUrl + '/customer';
  constructor(private httpClient: HttpClient) {}

  createCustomer(customerDetails: Customer) {
    return this.httpClient.post(this.customerEndPoint, customerDetails);
  }

  getCustomerList() {
    return this.httpClient.get(this.customerEndPoint);
  }

  getCustomerDetails(Id: number) {
    return this.httpClient.get(this.customerEndPoint + Id);
  }

  updateCustomerDetails(Id: number) {
    return this.httpClient.put(this.customerEndPoint + Id, Customer);
  }
}
