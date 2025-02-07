import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  headerContent = new BehaviorSubject('');
  ShoppingCart = new BehaviorSubject(false);

  constructor() {}
  setHeader(content: string) {
    this.headerContent.next(content);
  }
  addCartLink(putIt: boolean) {
    this.ShoppingCart.next(putIt);
  }
}
