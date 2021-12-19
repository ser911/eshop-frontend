import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@eshop-frontend/products';
import { Product } from '@eshop-frontend/products';
import { Category } from '@eshop-frontend/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
   products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe(products =>{
      this.products = products;
    })

  }

  deleteProduct(){

  }
  updateProduct(){

  }
}
