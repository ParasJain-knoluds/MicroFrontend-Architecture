import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.css']
})
export class RecipeCardsComponent implements OnInit {

 @Input() displayRecipe:any = [];

  constructor( private api: ApiService) { }

  ngOnInit(): void {

   }
}
