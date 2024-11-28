import { Component } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export default class OffersComponent {
  products: Product[] = [];

  constructor(private product: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.product.getProducts().subscribe((products) => {
      // Filtramos los productos que tienen un descuento
      this.products = products
        .filter((product) => product.oferta > 0)
        .map((product) => ({
          ...product,
          imageUrl: 'http://localhost:3000' + product.image, // Concatenamos la URL base
        }));

      console.log('Lista de productos con descuento', this.products);
    });
  }

  addToCart(productId: string) {
    console.log(`Producto con ID ${productId} añadido al carrito`);
  }

  getDiscountedPrice(product: Product): number {
    if (product.oferta) {
      return product.price - (product.price * product.oferta) / 100;
    }
    return product.price;
  }
}
