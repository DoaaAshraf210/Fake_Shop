import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../Services/products.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-details',
  imports: [ToastrModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  id: any;
  data: any = {};
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(
    private _ProductsService: ProductsService,
    private router: ActivatedRoute,
    private _Store: Store<{ theme: string }>
  ) {
    this.id = router.snapshot.paramMap.get('id');
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
  }
  getProductDetails() {
    this._ProductsService.getProduct(this.id).subscribe({
      next: (res) => {
        this.data = res;
      },
    });
  }
}
