import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-structure',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-structure.component.html',
  styleUrl: './product-structure.component.css',
})
export class ProductStructureComponent implements OnInit {
  mode: any;
  @Input() data: any = {};
  @Output() addToCart: any = new EventEmitter();
  amount: number = 0;
  addButton: boolean = false;
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(
    private toastr: ToastrService,
    private _Store: Store<{ theme: string }>
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }

  ngOnInit(): void {}
  add() {
    this.addButton = !this.addButton;
    if (this.amount) {
      this.addToCart.emit({ item: this.data, quantity: this.amount });
      this.addButton = false;
    } else
      this.toastr.error('Add Quantity Of Product', '', {
        closeButton: false,
      });
  }
  decrement() {
    if (this.amount > 0) this.amount--;
  }
  increment() {
    if (this.amount <= 10) this.amount++;
  }
}
