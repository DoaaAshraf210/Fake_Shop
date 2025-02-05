import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-admin-product',
  standalone: false,
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css',
})
export class AdminProductComponent implements OnInit {
  products: any = [];
  constructor(
    private dialog: MatDialog,
    private _ProductsService: ProductsService,
    private toastr: ToastrService // private _Store: Store<{ theme: string }>
  ) {
    // this.currentTheme$ = this._Store.select('theme');
    // this.currentTheme$.subscribe((newTheme) => {
    //   this.themeMode = newTheme;
    // });
  }

  ngOnInit(): void {
    this.getProduct();
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
  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '1200px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  update(idx: any, item: any) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '1200px',
      data: { product: item, id: idx },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
