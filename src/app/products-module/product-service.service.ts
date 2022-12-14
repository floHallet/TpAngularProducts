//import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { Product, Row } from '../Interface/Interface';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  selectedProducts: Product[] = [];
  filters = {
    name: '',
    fmRadio: null,
    availability: [],
  };

  private localDb;
  localDbHasBeenCalled = false;

  //constructor(private httpClient: HttpClient) {}

  constructor() {
    this.localDb = new PouchDB('phones');
    const remoteDb = new PouchDB(
      'https://6a59157b-430d-4969-b802-b9c12470dafb-bluemix.cloudantnosqldb.appdomain.cloud/phones'
    );
    this.localDb.replicate.from(remoteDb, {
      live: true,
      retry: true,
    });
    //firstcallto db
    this.localDb.allDocs({
      include_docs: true,
    }).then(() => this.localDbHasBeenCalled=true);
  }

  setSelectedProducts(products: Product[]): void {
    this.selectedProducts = products;
  }

  applyFilters(products: Product[]) {
    let results = products;

    //console.log("applyfilters with", this.filters, results);

    if (this.filters.name) {
      results = results.filter(({ name }) =>
        name.toLowerCase().includes(this.filters.name.toLowerCase())
      );
      //console.log("filter by name",results);
    }

    if (this.filters.fmRadio !== null) {
      results = results.filter(
        ({ hardware }) => hardware.fmRadio === this.filters.fmRadio
      );
      //console.log("filter by fmradio",results);
    }

    if (this.filters.availability.length) {
      results = results.filter(({ availability }) => {
        for (const element of this.filters.availability) {
          if (availability.includes(element['value'])) {
            return true;
          }
        }
        return false;
      });
      //console.log("filter by availability",results);
    }

    return results;
  }

  getAllDocs(): Observable<Product[]> {
    return from(
      this.localDb.allDocs({
        include_docs: true,
      })
    ).pipe(
      map((data: any) => data.rows.map((r: Row) => r.doc)),
      map((projects) => this.applyFilters(projects))
    );
  }

  getDocById(id: string): Observable<Product> {
    return from(this.localDb.get(id) as Promise<Product>);
  }

  /*
  getAllDocs(): Observable<any> {
    return this.httpClient
      .get<any>(
        'https://6a59157b-430d-4969-b802-b9c12470dafb-bluemix.cloudantnosqldb.appdomain.cloud/phones/_all_docs?include_docs=true'
      )
      .pipe(
        map(({ rows }) =>
          rows.map((el: Row) => {
            return el.doc;
          })
        ),
        map((projects) => this.applyFilters(projects))
      );
  }

  getDocById(id: string) {
    return this.httpClient.get<any>(
      'https://6a59157b-430d-4969-b802-b9c12470dafb-bluemix.cloudantnosqldb.appdomain.cloud/phones/' +
        id
    );
  }*/
}
