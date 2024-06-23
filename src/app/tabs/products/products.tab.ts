import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.tab.html',
  styleUrls: ['./products.tab.css']
})
export class ProductsComponent {
  title = 'products';
  productQuantity: number = 5;
  productPrice: number = 6;

  constructor(){}

}
