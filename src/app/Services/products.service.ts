import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get(`${environment.apiUrl}/products`);
  }
  getAllCategories() {
    return this.http.get(`${environment.apiUrl}/products/categories`);
  }
  getCategory(keyword: any) {
    return this.http.get(`${environment.apiUrl}/products/category/${keyword}`);
  }
  getProduct(id: any) {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }
  deleteProduct(id: any) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
  addProduct(item: any) {
    return this.http.post(`${environment.apiUrl}/products`, item);
  }
  updateProduct(id: any, item: any) {
    return this.http.put(`${environment.apiUrl}/products/${id}`, item);
  }
}
