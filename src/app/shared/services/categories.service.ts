import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllCategoriesListService() {
    return this.http.get<string[]>(`${this.apiUrl}/products/category-list`);
  }
}
