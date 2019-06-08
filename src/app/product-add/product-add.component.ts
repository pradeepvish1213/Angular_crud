import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  angForm: FormGroup;

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private ps: ProductsService) {
    this.createForm();
  }

  addProduct(ProductName: string, ProductDescription: string, ProductPrice: number) {
    console.log('Product Form submited');
    this.ps.addProduct(ProductName, ProductDescription, ProductPrice);
  }

  ngOnInit() {
  }

}
