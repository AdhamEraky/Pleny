import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { sharedModule } from 'src/app/shared/shared.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { FilterMenuComponent } from 'src/app/shared/components/filter-menu/filter-menu.component';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, sharedModule],
  declarations: [
    ProductsListComponent,
    ProductCardComponent,
    FilterMenuComponent,
  ],
})
export class ProductsModule {}
