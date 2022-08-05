import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'st-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss'],
})
export class ProductsSearchComponent implements OnInit {
  name = "";
  fmRadio = null;
  labels = [
    { label: 'T-Mobile', value: 'T-Mobile' },
    { label: 'Verizon', value: 'Verizon' },
  ];
  availability= [];

  constructor(private productService: ProductServiceService, private router: Router) {
    this.name = this.productService.filters.name;
    this.fmRadio = this.productService.filters.fmRadio;
    this.availability = this.productService.filters.availability;
  }

  ngOnInit(): void {}

  handleClick() {
    //console.log(this.search, this.checkbox, this.selected);
    this.productService.filters = {
      name: this.name,
      fmRadio: this.fmRadio,
      availability: this.availability,
    };
    this.router.navigate(['products']);
  }

  reset() {
    this.name = '';
    this.fmRadio = null;
    this.availability = [];
    this.productService.filters = {
      name: this.name,
      fmRadio: this.fmRadio,
      availability: this.availability,
    };
  }
}
