import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CartService } from '../../Services/Cart.service';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { lengthOfCart } from '../products/products.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ToastrModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProduct: any = [];
  total: any = 0;
  Shipping: any = 5.0;
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(
    private _CartService: CartService,
    private toastr: ToastrService,
    private _Store: Store<{ theme: string }>
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getCartTotalPrice();
  }
  getCartTotalPrice() {
    this.total = 0;
    this.cartProduct.forEach((item: any) => {
      this.total += item.item.price * item.quantity;
    });
  }
  decrement(idx: any) {
    if (this.cartProduct[idx].quantity) this.cartProduct[idx].quantity--;
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.getCartTotalPrice();
  }
  increment(idx: any) {
    this.cartProduct[idx].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.getCartTotalPrice();
  }
  remove(idx: any) {
    this.cartProduct.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }
  clear() {
    this.cartProduct = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.getCartTotalPrice();
  }
  order() {
    let formatProducts = this.cartProduct.map((item: any) => {
      return { productId: item.item.id, quantity: item.quantity };
    });
    let MODEL = {
      userId: 1,
      date: new Date(),
      products: formatProducts,
    };

    this._CartService.addNewCart(MODEL).subscribe((res) => {
      this.toastr.success('Order has been successfully placed!', 'Success');
    });
  }
}
