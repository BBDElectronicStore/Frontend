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
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
    });

    //Get user info, if this fails log user out
    this.authService.getUserInfo().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(
          () => new Error(`Error fetching user info: ${error.status}: ${error.message}`)
        );
      })
    ).subscribe(userInfo => { 
      if (userInfo) {
        console.log("🚀 ~ HomeComponent ~ ngOnInit ~ userInfo:", userInfo);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  businessName: String = 'Byte Bazaar Digital';
}