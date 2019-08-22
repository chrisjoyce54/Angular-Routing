import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService,
      private route: ActivatedRoute) { }


      ngOnInit(): void {
        this.loading = true;
        console.log('Loading = true = ' + this.loading);
        this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

        this.productService.getProducts().subscribe(
          products => {
            this.products = products;
            this.filteredProducts = this.performFilter(this.listFilter);
            this.loading = false;
            console.log('Loading = false = ' + this.loading);
          },
          error => {
            this.errorMessage = <any>error;
            this.loading = false;
            console.log('Loading = false = ' + this.loading);
          }
        );
      }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
