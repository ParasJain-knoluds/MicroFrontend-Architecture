import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreteRecipeComponent } from './Components/crete-recipe/crete-recipe.component';
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

  title = 'RecipeRepo';

  lists=['Total', 'Created', 'Updated','Deleted'];

  ngOnInit(){
  }


  toggleNevbar(){
    this.nevbarOpen = !this.nevbarOpen;
  }




  openDialog() {
    this.dialog.open(CreteRecipeComponent, {
    width:'60%'
     }).afterClosed().subscribe(res=>{
       if(res==='save')
       {
        this.route.navigate(['home'])
       }

     })
  }


}
