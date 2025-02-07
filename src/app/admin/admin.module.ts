import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  Routes,
} from '@angular/router';
import { CartComponent } from '../admin/Components/cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './Components/view/view.component';
import { AdminProductComponent } from './Components/admin-product/admin-product.component';
import { HeaderComponent } from '../Components/header/header.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { SelectComponent } from '../Components/select/select.component';
import { HeaderService } from '../Services/header.service';

export const routes: Routes = [
  { path: '', redirectTo: '/admin/cart', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: AdminProductComponent },
  { path: '**', redirectTo: '/admin/cart', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    CartComponent,
    ViewComponent,
    AdminProductComponent,
    AddProductComponent,
  ],

  imports: [
    ReactiveFormsModule,
    RouterModule,
    RouterLinkActive,
    RouterLink,
    ToastrModule,
    CommonModule,
    RouterModule.forChild(routes),
    SelectComponent,
  ],
})
export class AdminModule {
  constructor(private headerService: HeaderService) {
    this.headerService.setHeader('Admin Dashboard');
    this.headerService.addCartLink(false);
  }
}
