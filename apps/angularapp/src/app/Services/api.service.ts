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



  getRecipe() {
    return this.http.get("http://localhost:3000/CreateList/");
  }

  getRecipeById(id: number) {
    return this.http.get("http://localhost:3000/CreateList/" + id);
  }

  postRecipe(data: any) {
    return this.http.post("http://localhost:3000/CreateList/", data);
  }

  putRecipe(data: any, id: number) {
    return this.http.put("http://localhost:3000/CreateList/" + id, data)
  }

  deleteRecipe(id: number) {
    return this.http.delete("http://localhost:3000/CreateList/" + id);
  }


}


