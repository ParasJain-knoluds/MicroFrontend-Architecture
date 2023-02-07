import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardsComponent } from './recipe-cards/recipe-cards.component';



@NgModule({
  declarations: [
    RecipeCardsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecipeCardsComponent
  ]
 
})
export class CommonDataModule { }
