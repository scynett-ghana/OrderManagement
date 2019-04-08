import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  companyEndpoint = environment.baseUrl + '/form';
  constructor(private httpClient: HttpClient) {}

  updateCompany(companyDetails: Company) {
    return this.httpClient.put(this.companyEndpoint, companyDetails);
  }
}
