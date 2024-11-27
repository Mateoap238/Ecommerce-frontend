import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from '../../../shared/components/product-modal/product-modal.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ProductModalComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export default class AdminProductsComponent implements OnInit {
  isModalOpen = signal(false);
  products: Product[] = [];

  @ViewChild(ProductModalComponent) productModal!: ProductModalComponent;

  constructor(private product: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  openEditModal(product: Product) {
    this.isModalOpen.set(true);
    this.productModal.loadProduct(product);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  getProducts() {
    this.product.getProducts().subscribe((products) => {
      this.products = products as Product[];
      console.log('lista de productos', this.products);
    });
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.closeModal();
  }

  updateProduct(product: Product) {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
    this.closeModal();
  }

  deleteProduct(id: string) {
    this.product.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
