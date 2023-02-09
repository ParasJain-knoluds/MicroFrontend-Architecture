import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddProductComponent} from './Components/add-product/add-product.component';
import { ApiService } from './Services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'reactangular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private dialog:MatDialog, private api:ApiService, private route:Router) {}
  nevbarOpen=false;

  title = 'ProductRepo';

  lists=['Total', 'Created', 'Updated','Deleted'];

  ngOnInit(){
  }

  openDialog() {
    this.dialog.open(AddProductComponent, {
    width:'60%'
     }).afterClosed().subscribe(res=>{
       if(res==='save')
       {
        this.route.navigate(['home'])
       }

     })
  }


}
