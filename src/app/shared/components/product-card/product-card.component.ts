import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/pages/products/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  constructor(private readonly productsService: ProductsService) {}

  ngOnInit() {}
  addToCart() {
    this.productsService.addToCart();
  }
}
