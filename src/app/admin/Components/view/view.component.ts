import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductsService } from '../../../Services/products.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
  standalone: false,
})
export class ViewComponent implements OnInit {
  cartProduct: any;
  products: any = [];
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<ViewComponent>,
    private _ProductsService: ProductsService,
    private _Store: Store<{ theme: string }>
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }
  ngOnInit(): void {
    this.cartProduct = this.data;
    this.getDetails(this.cartProduct);
  }
  getDetails(ele: any) {
    this.products = [];
    ele.products.forEach((product: any) => {
      this._ProductsService.getProduct(product.productId).subscribe((res) => {
        this.products.push({ item: res, quantity: product.quantity });
      });
    });
  }
}
