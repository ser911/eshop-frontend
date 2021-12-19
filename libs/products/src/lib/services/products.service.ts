import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrlProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlProducts);
  }
/*   getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
  }
  */

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProducts, productData);
  }

/*   updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiUrlCategories}/${category.id}`,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlCategories}/${categoryId}`);
  }  */
}
