import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../interfaces/product";

@Injectable({providedIn: 'root'})
export class ApiService {
    baseURL: string = environment.baseURL;

    constructor(private http: HttpClient){}

    getProduct(): Observable<Product> {
        return this.http.get<Product>(this.baseURL + '/product');
    }

    //TODO: add account and sales objects
    getAccount(currentPage: number, currentPageSize: number, name: string, date: number): Observable<Object> {
        return this.http.get(this.baseURL + `/account?page=${currentPage}&size=${currentPageSize}&name=${name}&date=${date}`)
    }

    getSales(currentPage: number, currentPageSize: number, name: string, date: number): Observable<Object> {
        return this.http.get(this.baseURL + `/sales?page=${currentPage}&size=${currentPageSize}&name=${name}&date=${date}`)
    }

}