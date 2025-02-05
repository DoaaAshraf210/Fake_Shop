import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../Services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  categories: any = [];
  base64: any = '';
  dataReceived: any;
  id: any;
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(
    private _ProductsService: ProductsService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private toastr: ToastrService,
    private _Store: Store<{ theme: string }>
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.dataReceived = this.data.product;
      this.id = this.data.id;
    }

    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
    this._ProductsService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.setData();
  }
  getSelectedCategories(event: any) {
    this.form.get('category')?.setValue(event.target.value);
  }
  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue('Picture');
    };
  }
  addProduct() {
    this._ProductsService.addProduct(this.form.value).subscribe((res) => {
      this.toastr.success('', 'Add Product Successfully');
      this.dialogRef.close();
    });
  }
  setData() {
    this.form.patchValue({
      title: this.dataReceived?.title,
      price: this.dataReceived?.price,
      description: this.dataReceived?.description,
      image: this.dataReceived?.image,
      category: this.dataReceived?.category,
    });
    this.base64 = this.dataReceived?.image;
  }
  update() {
    this._ProductsService
      .updateProduct(this.id, this.form.value)
      .subscribe((res) => {
        this.toastr.success('', 'Updated Product Successfully');
        this.dialogRef.close();
      });
  }
}
