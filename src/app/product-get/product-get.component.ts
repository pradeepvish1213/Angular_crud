import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import Product from './../Product';
@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {
  products: Product[];

  constructor(private ps: ProductsService) { }

  deleteProduct(id) {
    this.ps.deleteProduct(id).subscribe(res => {
      this.products.splice(id, 1);
    });
  }
  ngOnInit() {
    this.ps.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

}
