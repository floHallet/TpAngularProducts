import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interface/Interface';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'st-products-compare',
  templateUrl: './products-compare.component.html',
  styleUrls: ['./products-compare.component.scss']
})
export class ProductsCompareComponent implements OnInit {

  selectedProducts: Product[] = [];

  constructor(private productService: ProductServiceService) {
    this.selectedProducts = this.productService.selectedProducts;
   }

  ngOnInit(): void {
    //console.log(this.selectedProducts);
  }

}
