import { Products } from '../products/products.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productEndPoint = environment.baseUrl + 'product';
  constructor(private httpClient: HttpClient) {}

  getProductList() {
    return this.httpClient.get(this.productEndPoint);
  }

  addProduct(productsDetails: Products) {
    return this.httpClient.post(this.productEndPoint, productsDetails);
  }
}
