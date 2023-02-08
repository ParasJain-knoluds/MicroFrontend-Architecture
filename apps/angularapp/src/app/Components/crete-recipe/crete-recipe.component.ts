import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../Services/api.service';



interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crete-recipe',
  templateUrl: './crete-recipe.component.html',
  styleUrls: ['./crete-recipe.component.css'],
})

export class CreteRecipeComponent implements OnInit {
  durationInSeconds = 5;
  foods: Food[] = [
    { value: '/../assets/bread-egg.jpg', viewValue: 'Bread Egg' },
    { value: '/../assets/burger.jpg', viewValue: 'Burger' },
    { value: '/../assets/choco-cake.jpg', viewValue: 'Choco Cake' },
    { value: '/../assets/chocolate.jpg', viewValue: 'Chocolate' },
    { value: '/../assets/coffee.jpg', viewValue: 'Coffee' },
    { value: '/../assets/cup-cake.jpg', viewValue: 'Cup Cake' },
    { value: '/../assets/ice-cream.jpg', viewValue: 'Ice-Cream' },
    { value: '/../assets/juice.jpg', viewValue: 'Juice' },
    { value: '/../assets/pizza.jpg', viewValue: 'pizza' },
    { value: '/../assets/veg-roll.jpg', viewValue: 'Veg Roll' }
  ];

  createList!: FormGroup;
  actionBtn = "Save";
  title = "Add a New Product!";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dilogRef: MatDialogRef<any>,


  ) {

  }

  ngOnInit(): void {
    this.createList = this.formBuilder.group({
      racipeName: ['', Validators.required],
      prepationTime: ['', Validators.required],
      ingredients: ['', Validators.required],
      foodImage: ['', Validators.required],
      instructions: ['', Validators.required],


    });

    if (this.editData) {
      this.title = "Update the Recipe"
      this.actionBtn = "Update"
      this.createList.controls['racipeName'].setValue(this.editData.racipeName)
      this.createList.controls['prepationTime'].setValue(this.editData.prepationTime)
      this.createList.controls['ingredients'].setValue(this.editData.ingredients)
      this.createList.controls['foodImage'].setValue(this.editData.foodImage)
      this.createList.controls['instructions'].setValue(this.editData.instructions)
    }


  }


  onSubmit() {
    if (!this.editData) {
      if (this.createList.valid) {
        this.api.postRecipe(this.createList.value).subscribe({
          next: (res) => {
            this.api.openSnackBar("Recipe added Successfully!");
            this.createList.reset();
            this.dilogRef.close('save');
          },
          error: () => {
            this.api.openSnackBar("error while geting Recipelist");

          },
        });
      }
    } else {
      this.updateRecipe();
    }
  }

  updateRecipe() {
    if (this.createList.valid) {
      this.api.putRecipe(this.createList.value, this.editData.id)
        .subscribe({
          next: () => {
            this.api.openSnackBar("Recipe Updated Successfully!");
            this.createList.reset();
            this.dilogRef.close({
              action: 'update',
              id: this.editData.id

            });

          },

          error: () => {
            this.api.openSnackBar("Unable to update Recipe!");
          }
        })

    }
  }
}

