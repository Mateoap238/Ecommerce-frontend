import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.slice(0, 4) as Product[];
      this.products = data.map((product) => ({
        ...product,
        imageUrl: 'http://localhost:3000' + product.image, // Concatenamos la URL base
      }));
    });
  }
}
