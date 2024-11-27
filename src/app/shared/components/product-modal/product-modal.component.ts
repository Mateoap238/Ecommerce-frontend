import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../../business/services/product.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() addProduct = new EventEmitter<Product>();
  @Output() updateProduct = new EventEmitter<Product>();

  newProduct: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    oferta: 0,
  };

  constructor(private productService: ProductService) {}

  loadProduct(product: Product) {
    this.newProduct = { ...product };
    this.isOpen = true;
  }

  onSubmit() {
    if (this.newProduct.id) {
      // Lógica para editar el producto
      this.productService
        .updateProduct(this.newProduct.id, this.newProduct)
        .subscribe((updatedProduct) => {
          this.updateProduct.emit(updatedProduct);
          this.close();
        });
    } else {
      this.productService
        .createProduct(this.newProduct)
        .subscribe((product) => {
          this.addProduct.emit(product);
          this.close();
        });
    }
  }

  close() {
    this.isOpen = false;
    this.closeModal.emit();
  }
}
