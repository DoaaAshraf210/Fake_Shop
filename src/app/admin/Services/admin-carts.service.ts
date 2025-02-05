import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminCartsService {
  constructor(private http: HttpClient) {}
  getAllCarts(param?: any) {
    let params = new HttpParams();
    params = params
      .append('startDate', param?.start)
      .append('endDate', param?.end);
    return this.http.get(`${environment.apiUrl}/carts`, { params });
  }
  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/carts/${id}`);
  }
}
