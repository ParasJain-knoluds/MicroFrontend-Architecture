import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../Services/api.service';

interface Product {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})

export class AddProductComponent implements OnInit {
  durationInSeconds = 5;
  products: Product[] = [
    { value: '/../assets/jeans.jpeg', viewValue: 'Jeans' },
    { value: '/../assets/hoodie.png', viewValue: 'Hoodie' },
    { value: '/../assets/jacket.png', viewValue: 'Jacket' },
    { value: '/../assets/jewel.png', viewValue: 'Jewellery' },
    { value: '/../assets/watch.jpeg', viewValue: 'Watch' },
    { value: '/../assets/smartWatch.png', viewValue: 'Smart Watch' },
    { value: '/../assets/shirt.jpg', viewValue: 'Shirt' },
    { value: '/../assets/tshirt.jpeg', viewValue: 'Tshirt' },
    { value: '/../assets/kurti.jpeg', viewValue: 'Kurti' },
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

