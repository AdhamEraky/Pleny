import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  loading = false;
  products: any[] = [];
  categories: string[] = [];
  totalProducts: number = 0;
  limit: number = 9;
  skip: number = 0;
  currentPage: number = 1;

  productSearchKey: any;
  selectedCategory: string = '';

  constructor(
    private readonly productsService: ProductsService,

    private readonly categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.productsService.searchKey$.subscribe((searchKey) => {
      this.limit = 9;
      this.skip = 0;
      this.productSearchKey = searchKey;
      this.getAllProducts();
    });
    this.getAllCategoriesList();
  }

  // Getting All Products
  getAllProducts() {
    this.loading = true;
    this.productsService
      .getAllProducts(
        this.limit,
        this.skip,
        this.productSearchKey,
        this.selectedCategory
      )
      .subscribe((res: any) => {
        this.products = res?.products;
        this.totalProducts = res?.total;
        this.loading = false;
      });
  }

  // Getting All Categories list for filtering
  getAllCategoriesList() {
    this.categoriesService
      .getAllCategoriesListService()
      .subscribe((res: any) => {
        this.categories = res;
      });
  }

  onCategorySelected(category: string) {
    if (category == 'All') {
      this.selectedCategory = '';
      // Logic to show all products
    } else {
      this.selectedCategory = category;
      // Logic to filter products by the selected category
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolling up to see the new products after selecting category
    this.getAllProducts();
  }

  // Method to change the page
  changePage(page: number) {
    this.skip = (page - 1) * this.limit;
    this.currentPage = page;
    this.getAllProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolling up to see the new products after pagination
  }

  // Calculate total pages
  get totalPages() {
    return Math.ceil(this.totalProducts / this.limit);
  }

  // Get the visible page numbers
  get visiblePages() {
    const total = this.totalPages;
    const pages = [];
    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(total, start + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (start > 1) {
      pages.unshift(1);
    }

    if (end < total) {
      pages.push(total);
    }

    return pages;
  }

  resetCategory() {
    this.selectedCategory = '';
    this.getAllProducts(); // To fetch all products when reset
  }
}
