import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdminCartsService } from '../../Services/admin-carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: false,
})
export class CartComponent implements OnInit {
  cartProduct: any = [];
  form!: FormGroup;
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(
    private fb: FormBuilder,
    private _AdminCartsService: AdminCartsService,
    private _Store: Store<{ theme: string }>,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      start: [''],
      end: [''],
    });
    this.getCarts();
  }
  applyFilter() {
    this._AdminCartsService
      .getAllCarts(this.form.value)
      .subscribe((res: any) => {
        this.cartProduct = res;
      });
  }
  getCarts() {
    this._AdminCartsService.getAllCarts().subscribe((res: any) => {
      this.cartProduct = res;
    });
  }
  deleteCart(id: any) {
    this._AdminCartsService.delete(id).subscribe((res: any) => {
      this.getCarts();
      this.toastr.success('', 'Cart Deleted Successfully');
    });
  }
  viewCart(idx: any) {
    const dialogRef = this.dialog.open(ViewComponent, {
      height: '700px',
      width: '900px',
      data: this.cartProduct[idx],
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
