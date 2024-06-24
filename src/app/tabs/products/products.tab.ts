import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-products',
  templateUrl: './products.tab.html',
  styleUrls: ['./products.tab.css'],
  standalone: true,
  imports: [
    MatCard,
    MatCardContent
  ]
})
export class ProductsComponent {
  title = 'products';
  productQuantity: number = 5;
  productPrice: number = 6;

  constructor(){}

}
