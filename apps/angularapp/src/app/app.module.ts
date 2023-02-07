import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreteRecipeComponent } from './Components/crete-recipe/crete-recipe.component';
import { HomeComponent } from './Components/home/home.component';
import { RecipyListComponent } from './Components/recipy-list/recipy-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatInputModule} from '@angular/material/input';
 import {MatChipsModule} from '@angular/material/chips';
 import {FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { HttpClientModule } from '@angular/common/http';
import { ReadModeComponent } from './Components/read-mode/read-mode.component';
import {MatSelectModule} from '@angular/material/select';
import { CommonDataModule } from './shared/common-data/common-data.module';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    CreteRecipeComponent,
    HomeComponent,
    RecipyListComponent,
    ReadModeComponent

  ],
  entryComponents:[CreteRecipeComponent],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    CommonDataModule,
    MatSnackBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent],

})
export class AppModule { }
