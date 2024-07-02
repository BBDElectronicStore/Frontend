import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SalesComponent } from '../tabs/sales/sales.tab';
import { AccountsComponent } from '../tabs/accounts/accounts.tab';
import { ProductsComponent } from '../tabs/products/products.tab';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

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
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const authorizationCode = params['code'];
      if (authorizationCode) {
        this.router.navigate(['home']);
        this.authService.exchangeCode(authorizationCode);
      }
      else if(this.authService.getAccessToken()) {
        this.authService.getUserInfo();
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  businessName: String = 'Byte Bazaar Digital';
}
