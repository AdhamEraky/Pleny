import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllProducts(
    limit: number,
    skip: number,
    productSearchKey: string,
    category: string
  ) {
    if (category) {
      return this.http.get<Product[]>(
        `${this.apiUrl}/products/category/${category}`
      );
    } else {
      return this.http.get<Product[]>(
        `${this.apiUrl}/products/search?q=${productSearchKey}&limit=${limit}&skip=${skip}`
      );
    }
  }

  // Taking the action from "Add to cart" button to the counter of the cart icon
  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();

  addToCart() {
    const currentCount = this.cartCountSource.value;
    this.cartCountSource.next(currentCount + 1);
  }

  // Taking the action of the search from the header to the product list component.
  private searchKeySubject = new BehaviorSubject<string>('');
  searchKey$ = this.searchKeySubject.asObservable();

  setSearchKey(searchKey: string) {
    this.searchKeySubject.next(searchKey);
  }
}
