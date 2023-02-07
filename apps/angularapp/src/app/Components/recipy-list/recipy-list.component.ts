
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
// import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-recipy-list',
  templateUrl: './recipy-list.component.html',
  styleUrls: ['./recipy-list.component.css'],
})
export class RecipyListComponent implements OnInit {
  constructor(private api: ApiService) { }

  displayRecipe: any = [];

  ngOnInit(): void {
    this.getAllRecipe();
  }

  getAllRecipe() {
    this.api.getRecipe().subscribe({
      next: (res) => {
        this.displayRecipe = res;
      },
      error: () => {
        this.api.openSnackBar("Unable to update Recipe!");
      },
    });
  }
}


