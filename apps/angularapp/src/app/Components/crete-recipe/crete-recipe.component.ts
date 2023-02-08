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
    { value: '/../assets/shirt.jpeg', viewValue: 'Shirt' },
    { value: '/../assets/tshirt.jpeg', viewValue: 'Tshirt' },
    { value: '/../assets/kurtiGirls.jpg', viewValue: 'Kurti' },
    { value: '/../assets/topGirls.jpg', viewValue: 'Top for Girls' }
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
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      productImage: ['', Validators.required],
    });

    if (this.editData) {
      this.title = "Update the Product"
      this.actionBtn = "Update"
      this.createList.controls['productName'].setValue(this.editData.productName)
      this.createList.controls['description'].setValue(this.editData.description)
      this.createList.controls['price'].setValue(this.editData.price)
      this.createList.controls['productImage'].setValue(this.editData.productImage)
    }


  }


  onSubmit() {
    if (!this.editData) {
      if (this.createList.valid) {
        this.api.postRecipe(this.createList.value).subscribe({
          next: (res) => {
            this.api.openSnackBar("Product added Successfully!");
            this.createList.reset();
            this.dilogRef.close('save');
          },
          error: () => {
            this.api.openSnackBar("Error while geting Products List");

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
            this.api.openSnackBar("Product Details Updated Successfully!");
            this.createList.reset();
            this.dilogRef.close({
              action: 'update',
              id: this.editData.id

            });

          },

          error: () => {
            this.api.openSnackBar("Unable to update details!");
          }
        })

    }
  }
}

