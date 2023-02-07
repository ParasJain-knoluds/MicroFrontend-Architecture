import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ReadModeComponent } from './Components/read-mode/read-mode.component';
import { RecipyListComponent } from './Components/recipy-list/recipy-list.component';
//import { CreteRecipeComponent } from './Components/crete-recipe/crete-recipe.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  { path: 'recipyList', component: RecipyListComponent },
  {
    path: 'recipyList',
    children: [
      {
        path: 'readMode/:id',
        component: ReadModeComponent,
      }
      
    ],
    
  },

  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
