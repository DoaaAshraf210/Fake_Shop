import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SelectComponent } from '../select/select.component';
import { ProductStructureComponent } from '../product-structure/product-structure.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
export const lengthOfCart: any = new BehaviorSubject({});

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SelectComponent, ProductStructureComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  themeMode: any;
  currentTheme$: Observable<string>;
  products: any = [];
  categories: any = [];
  productsOfCart: any = [];
  constructor(
    private _ProductsService: ProductsService,
    private toastr: ToastrService,
    private _Store: Store<{ theme: string }>
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }

  ngOnInit(): void {
    this.getProduct();
    this.getCategories();
  }
  getProduct() {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: () => {
        this.toastr.error(
          ' please try again later.',
          'Something bad happened.'
        );
      },
    });
  }
  getCategories() {
    this._ProductsService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        this.toastr.error(
          ' please try again later.',
          'Something bad happened.'
        );
      },
    });
  }
  filterByCategory(event: any) {
    event.target.value == 'all'
      ? this.getProduct()
      : this.getProductsByCategory(event.target.value);
  }
  getProductsByCategory(keyword: any) {
    this._ProductsService.getCategory(keyword).subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        this.toastr.error(
          ' please try again later.',
          'Something bad happened.'
        );
      },
    });
  }
  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.productsOfCart = JSON.parse(localStorage.getItem('cart')!);
      let itemExist = this.productsOfCart.find(
        (item: any) => item.item.id == event.item.id
      );
      if (itemExist) {
        this.toastr.error(
          'Product Already Exist in Your Cart',
          'Something bad happened.'
        );
      } else {
        this.productsOfCart.push(event);
        localStorage.setItem('cart', JSON.stringify(this.productsOfCart));
        this.toastr.success('', 'Product Added Successfully to your cart');
      }
    } else {
      this.productsOfCart.push(event);
      localStorage.setItem('cart', JSON.stringify(this.productsOfCart));
      this.toastr.success('', 'Product Added Successfully to your cart');
    }
    lengthOfCart.next({
      size: this.productsOfCart.length,
    });
  }
}
