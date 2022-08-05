import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCompareComponent } from './products-compare/products-compare.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsSearchComponent } from './products-search/products-search.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    data: {
      title: 'Products List'
    }
  },
  {
    path: 'products/search',
    component: ProductsSearchComponent,
    data: {
      title: 'Products Search'
    }
  },
  {
    path: 'products/compare',
    component: ProductsCompareComponent,
    data: {
      title: 'Products Compare'
    }
  },
  {
    path: 'products/:productId',
    component: ProductsDetailsComponent,
    data: {
      title: 'Products Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsModuleRoutingModule { }
