import { Injectable } from '@angular/core';
import { Company, Taxes } from './company.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  companyEndpoint = environment.baseUrl + 'admin';
  taxEndpoint = environment.baseUrl + 'tax';
  constructor(private httpClient: HttpClient) {}

  updateCompanyDetails(companyDetails: Company) {
    return this.httpClient.post(this.companyEndpoint, companyDetails);
  }

  viewCompanyDetails() {
    return this.httpClient.get(this.companyEndpoint);
  }

  viewTaxDetails() {
    return this.httpClient.get(this.taxEndpoint);
  }

  addTaxDetails(taxDetails: Taxes) {
    return this.httpClient.post(this.taxEndpoint, taxDetails);
  }

  updateTaxDetails(taxId: string, taxDetails: Taxes) {
    return this.httpClient.put(this.taxEndpoint + '/' + taxId, taxDetails);
  }
}
