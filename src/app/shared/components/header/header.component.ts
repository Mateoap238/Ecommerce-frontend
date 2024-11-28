import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isCartModalOpen = false;
  cartProducts = [
    { name: 'Producto 1', price: 10.0 },
    { name: 'Producto 2', price: 15.0 },
  ];

  openCartModal() {
    this.isCartModalOpen = true;
  }

  closeCartModal() {
    this.isCartModalOpen = false;
  }

  removeProduct(index: number) {
    this.cartProducts.splice(index, 1);
  }

  getTotal() {
    return this.cartProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  }
}
