import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/Interface/Interface';

@Component({
  selector: 'st-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {
  product!: Product;
  mainImageUrl = '';

  constructor(
    private productService: ProductServiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap) =>
          this.productService.getDocById(paramMap.get('productId')!)
        )
      )
      .subscribe((data) => {
        this.product = data;
        this.mainImageUrl = this.product.images[0];
      });
  }

  setImage(img: string) {
    //console.log(img);
    this.mainImageUrl = img;
  }
}
