//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
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

  constructor() {
    this.localDb = new PouchDB('phones');
    const remoteDb = new PouchDB(
      'https://6a59157b-430d-4969-b802-b9c12470dafb-bluemix.cloudantnosqldb.appdomain.cloud/phones'
    );
    this.localDb.replicate.from(remoteDb, {
      live: true,
      retry: true,
    });
  }
  //constructor(private httpClient: HttpClient) {} AVANT EX14!

  setSelectedProducts(products: Product[]): void {
    this.selectedProducts = products;
  }

  applyFilters(products: Product[]) {
    let results = products;

    //console.log("applyfilters with", this.filters, results);

    if (this.filters.name) {
      results = results.filter(({name}) => name.toLowerCase().includes(this.filters.name.toLowerCase()));
      //console.log("filter by name",results);
    }

    if (this.filters.fmRadio !== null) {
      results = results.filter(({hardware}) => hardware.fmRadio === this.filters.fmRadio);
      //console.log("filter by fmradio",results);
    }

    if (this.filters.availability.length) {
      results = results.filter(({availability}) => {
        for (const element of this.filters.availability) {
          if (availability.includes(element["value"])) {
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
  /* Method avant ex14
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
        )
      );
  }

  getDocById(id: string) {
    return this.httpClient.get<any>(
      'https://6a59157b-430d-4969-b802-b9c12470dafb-bluemix.cloudantnosqldb.appdomain.cloud/phones/' +
        id
    );
  }*/
}
