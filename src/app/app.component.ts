import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatCardModule } from "@angular/material/card";
// import { MatSidenavModule } from "@angular/material/sidenav";
// import { MatCheckboxModule } from "@angular/material/checkbox";
import { SalesComponent } from './tabs/sales/sales.tab';
import { AccountsComponent } from './tabs/accounts/accounts.tab';
import { ProductsComponent } from './tabs/products/products.tab';
import { LoginComponent } from './login/login.component';
// import { AppRoutingModule } from "./app.routes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabsModule,
    SalesComponent,
    AccountsComponent,
    ProductsComponent
    //LoginComponent,
    //     MatCardModule,
    //     MatSidenavModule,
    //     MatCheckboxModule,

    //     AppRoutingModule
  ]
})
export class AppComponent {
  title = 'Byte Bazaar';
}
