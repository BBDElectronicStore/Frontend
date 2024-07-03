import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.tab.html',
  styleUrls: ['./products.tab.css'],
  standalone: true,
  imports: [MatCard, MatCardContent, MatIconModule, MatButtonModule]
})
export class ProductsComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.refresh();
  }
  title = 'products';
  productPrice: number = 0;

  refresh() {
    this.apiService.getProduct().subscribe(product => {
      if (product) {
        console.log(
          '🚀 ~ ProductsComponent ~ this.apiService.getProduct ~ product:',
          product
        );
        this.productPrice = product.total;
      }
    });
  }
}
