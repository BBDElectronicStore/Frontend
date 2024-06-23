import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ProductsComponent } from  './tabs/products/products.tab'
import { BrowserModule } from "@angular/platform-browser";
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AccountsComponent } from "./tabs/accounts/accounts.tab";
import { SharesComponent } from "./tabs/shares/shares.tab";

@NgModule({ declarations: [
    AppComponent,
    ProductsComponent,
    AccountsComponent,
    SharesComponent
],
bootstrap: [AppComponent],
imports: [BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule
],
providers: [
  provideAnimationsAsync()
]})

export class AppModule {
    constructor(){}
}