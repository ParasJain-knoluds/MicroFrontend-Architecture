import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreteRecipeComponent } from '../crete-recipe/crete-recipe.component';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-read-mode',
  templateUrl: './read-mode.component.html',
  styleUrls: ['./read-mode.component.css'],
})
export class ReadModeComponent implements OnInit {
  displayRecipe: any;
  c=0

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        let pid: any = param.get('id');
        this.getData(pid);
      },
    });
  }

  getData(pid:any){
    this.api.getRecipeById(pid).subscribe({
      next: (res) => {
        this.displayRecipe = res;
      },

    });
  }

  editRecipe() {
    this.dialog.open(CreteRecipeComponent, {
      width: '60%',
      data: this.displayRecipe,

  }).afterClosed().subscribe(val=>{
        if(val.action ==='update')
       {
        this.getData(val.id);
       }
    })
  }

  deleteRecipe(id: number) {
    this.api.deleteRecipe(id).subscribe({
      next: () => {
        this.api.openSnackBar("Recipe Deleted Successfully!");
        this.route.navigate(['recipyList'])
      },
      error: () => {
        this.api.openSnackBar("Unable to Delete Recipe");
      },
    })

  }
}
