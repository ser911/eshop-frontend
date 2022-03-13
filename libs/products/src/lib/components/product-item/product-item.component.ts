/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnInit } from '@angular/core';
import { CartService, CartItem } from '@eshop-frontend/orders';
import { Product } from '../../models/product';

@Component({
  selector: 'eshop-frontend-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }

    this.cartService.setCartItem(cartItem);
  }

}
