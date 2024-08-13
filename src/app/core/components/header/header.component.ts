import { AuthService } from './../../auth/services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/pages/products/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuActive = false; // Tracks whether the menu is open
  cartCount: number = 0; //Number of products in cart
  productSearchKey: any; //Searching for product
  isDropdownVisible = false; //Showing the dropdown list of account
  isProductsPageActive: boolean = false; // Track if the products page is active

  @ViewChild('searchInput2') searchInput2: ElementRef | any;

  constructor(
    private authService: AuthService,
    private readonly productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gettingTheCartNumber();
    this.checkUrl();
  }

  checkUrl() {
    if (this.router.url.includes('/products')) {
      this.isProductsPageActive = true;
    } else {
      this.isProductsPageActive = false;
    }
  }

  gettingTheCartNumber() {
    this.productsService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  onSearchInput(searchValue: string) {
    this.productsService.setSearchKey(searchValue);
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  onProductsClick() {
    this.isProductsPageActive = true; // Set to true when the Products link is clicked
  }

  onHomeClick() {
    this.isProductsPageActive = false; // Set to false when the Home link is clicked
  }

  logout() {
    this.authService.logout();
  }
}
