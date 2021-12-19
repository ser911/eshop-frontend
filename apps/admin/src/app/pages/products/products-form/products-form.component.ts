import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, ProductsService, Product } from '@eshop-frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';



@Component({
  selector: 'eshop-frontend-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  categories: Category[];
  imageDisplay: string | ArrayBuffer | null;
  galleryFiles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
    this._getCategories();
  }
  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      sex: ['', Validators.required],
      image: [''],
      images: [''],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product was not created!',
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return console.log('error');
    }
    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      console.log(key);
      console.log(this.productForm[key].value);
      productFormData.append(key, this.productForm[key].value);
    });

    this._addProduct(productFormData);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  onGalleryUpload(event) {
    if (event.target.files) {
      for (var i = 0; i <= 7; i++) {
        let reader = new FileReader();

        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {

          this.galleryFiles.push(event.target.result);
        };
      }
    }
  }

  get productForm() {
    return this.form.controls;
  }
}
