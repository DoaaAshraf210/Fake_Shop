import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { themeAction } from '../../Store/theme/theme.action';
import { lengthOfCart } from '../products/products.component';
import { HeaderService } from '../../Services/header.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  headerHeading = 'FakeShop';
  themeMode: any;
  currentTheme$: Observable<string>;
  len: any = 0;
  shoppingCart: boolean = false;

  constructor(
    private _Store: Store<{ theme: string }>,
    private headerService: HeaderService
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });

    headerService.headerContent.subscribe((res) => {
      this.headerHeading = res;
    });
    headerService.ShoppingCart.subscribe((res) => {
      this.shoppingCart = res;
    });
  }
  ngOnInit(): void {
    lengthOfCart.subscribe((res: any) => {
      this.len = res.size;
    });
  }
  ngAfterViewInit() {
    // this code return length of cart if reload page

    if ('cart' in localStorage) {
      this.len = JSON.parse(localStorage.getItem('cart')!).length;
    }
  }
  changeMode() {
    this._Store.dispatch(
      themeAction({
        theme: this.themeMode == 'white' ? 'dark' : 'white',
      })
    );
  }
}
