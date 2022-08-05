import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { ProductsModuleRoutingModule } from './products-module-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ProductsSearchComponent } from './products-search/products-search.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsCompareComponent } from './products-compare/products-compare.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ProductsSearchComponent,
    ProductsListComponent,
    ProductsCompareComponent,
    ProductsDetailsComponent,
  ],
  imports: [
    SharedModuleModule,
    ProductsModuleRoutingModule,
    AgGridModule,
    FormsModule,
    InputTextModule,
    TriStateCheckboxModule,
    ListboxModule,
    ButtonModule,
  ],
})
export class ProductsModuleModule {}
