import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService, CategoriesService, Category } from '@eshop-frontend/products';
import { Brand } from '@eshop-frontend/products';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'eshop-frontend-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  brands: Brand[] = [];
  endSubs$ : Subject<any>= new Subject();


  visible = false;

  constructor(private categoriesService: CategoriesService, private brandsService: BrandsService) { }


  ngOnInit(): void {
    this._getCategories();
    this._getBrands();
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }

  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories =>{
      this.categories = categories;      
    })
  }

  private _getBrands(){
    this.brandsService.getBrands().pipe(takeUntil(this.endSubs$)).subscribe((brands)=>{
      this.brands = brands;
      console.log(this.brands);      
    });
  }



}
