import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
})
export class FilterMenuComponent implements OnInit {
  @Input() category: string[] = [];

  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private readonly categoriesService: CategoriesService) {}

  ngOnInit() {}

  onCategoryChange(selectedCategory: string) {
    this.categorySelected.emit(selectedCategory);
  }
}
