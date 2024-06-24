import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SalesComponent } from "./tabs/sales/sales.tab";
import { AccountsComponent } from "./tabs/accounts/accounts.tab";
import { ProductsComponent } from "./tabs/products/products.tab";

@NgModule({ declarations: [
    AppComponent
],
bootstrap: [AppComponent],
imports: [BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    SalesComponent,
    AccountsComponent,
    ProductsComponent
],
providers: [
  provideAnimationsAsync()
]})

export class AppModule {
    constructor(){}
}