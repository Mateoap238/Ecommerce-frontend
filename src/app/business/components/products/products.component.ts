import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export default class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private product: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.product.getProducts().subscribe((products) => {
      // Aquí modificamos la URL de la imagen para que tenga la URL completa
      this.products = products.map((product) => ({
        ...product,
        imageUrl: 'http://localhost:3000' + product.image, // Concatenamos la URL base
      }));

      console.log('Lista de productos', this.products);
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
