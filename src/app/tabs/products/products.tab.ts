import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  templateUrl: './products.tab.html',
  styleUrls: ['./products.tab.css'],
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProductsComponent {
  title = 'products';
  // TODO: keep this updated with data from HoZ
  productPrice: number = 6;

  refresh() {
    // TODO: get latest price
  }

  constructor(){}

}
