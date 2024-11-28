import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<any[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();

  addProduct(productId: any) {
    const currentProducts = this.cartProductsSubject.value;
    this.cartProductsSubject.next([...currentProducts, productId]);
  }

  removeProduct(index: number) {
    const currentProducts = this.cartProductsSubject.value;
    currentProducts.splice(index, 1);
    this.cartProductsSubject.next([...currentProducts]);
  }
}
