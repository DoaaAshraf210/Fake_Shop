import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private http: HttpClient) {}
  addNewCart(model: any) {
    return this.http.post(`${environment.apiUrl}/carts/`, model);
  }
}
