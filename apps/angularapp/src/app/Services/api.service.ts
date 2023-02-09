import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string ) {
    this._snackBar.open(message ,'ok');
  }

  getProducts() {
    return this.http.get("http://localhost:3000/products/");
  }

  getProductById(id: number) {
    return this.http.get("http://localhost:3000/products/" + id);
  }

  postProduct(data: any) {
    return this.http.post("http://localhost:3000/products/", data);
  }

  putProduct(data: any, id: number) {
    return this.http.put("http://localhost:3000/products/" + id, data)
  }

  deleteProduct(id: number) {
    return this.http.delete("http://localhost:3000/products/" + id);
  }


}


