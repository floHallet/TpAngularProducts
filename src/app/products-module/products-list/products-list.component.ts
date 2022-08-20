import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Product } from 'src/app/Interface/Interface';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';
import { catchError, throwError, retry, tap } from 'rxjs';

@Component({
  selector: 'st-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  disableButton = true;

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  columnDefs: ColDef[] = [
    {
      field: '_id',
      flex: 1,
      pinned: 'left',
      lockPosition: 'left',
      checkboxSelection: true,
    },
    { field: 'name', flex: 1 },
    { field: 'additionalFeatures', flex: 3 },
  ];

  rowData!: Product[];

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.productService.localDbHasBeenCalled) {
      this.productService
      .getAllDocs()
      .subscribe({
        next: (data) => {
          this.rowData = data;
        },
        error: (error: any) => console.log(error),
      });
    } else {
      setTimeout(() => {
        this.productService
          .getAllDocs()
          .subscribe({
            next: (data) => {
              this.rowData = data;
            },
            error: (error: any) => console.log(error),
          });
      }, 2000);
    }
  }

  handleRowClick(event: any) {
    this.router.navigate(['products', event.data._id]);
  }

  handleSelectionChanged(event: any): void {
    this.productService.setSelectedProducts(event.api.getSelectedRows());
    const selectedProducts = this.productService.selectedProducts.length;
    if (selectedProducts >= 2 && selectedProducts < 4) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  handleButtonClick() {
    this.router.navigate(['products', 'compare']);
  }
}
