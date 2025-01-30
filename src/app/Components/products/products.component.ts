import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any = [];

  constructor(
    private _ProductsService: ProductsService,
    private toastr: ToastrServicn
  ) {}

  ngOnInit(): void {
    this.allProduct();
  }

  clicking() {
    this.toastr.success('Click event triggered!', 'Success');
  }

  allProduct() {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.toastr.success('Products loaded successfully!', 'Success');
        this.products = res;
      },
      error: () => {
        this.toastr.error(
          'Something went wrong. Please try again later.',
          'Error'
        );
      },
    });
  }
}
