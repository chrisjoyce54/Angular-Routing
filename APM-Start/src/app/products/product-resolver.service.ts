import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {

constructor(private productService: ProductService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
  const id = route.paramMap.get('id'); // don't cast to number here in case it's invalid
  if (isNaN(+id)) {
    const message = 'Product id was not numeric: ${id}';
    console.log(message);
    // error page, build service that holds info, custom error handler or define resolved data to include error info
    return of({product: null, error: message});
  }
  // map takes product from service and changes to ProductResolved error part is unnecessary here
  return this.productService.getProduct(+id)
    .pipe(
      map(product => ({ product: product, error: null })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ product: null, error: message });
      })
    );
}

}
