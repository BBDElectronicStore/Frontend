import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SalesComponent } from '../tabs/sales/sales.tab';
import { AccountsComponent } from '../tabs/accounts/accounts.tab';
import { ProductsComponent } from '../tabs/products/products.tab';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTabsModule,
    SalesComponent,
    AccountsComponent,
    ProductsComponent,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  businessName: String = 'Byte Bazaar Digital';

}
