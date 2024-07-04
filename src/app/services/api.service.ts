import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../interfaces/product";
import { Customer } from "../interfaces/customer";
import { Order } from "../interfaces/order";

@Injectable({providedIn: 'root'})
export class ApiService {
    baseURL: string = environment.baseURL;

    constructor(private http: HttpClient){}

    getCustomers(): Observable<Customer[]> {
        // Maybe pagination on backend
        // return this.http.get(this.baseURL + `/customer?page=${currentPage}&size=${currentPageSize}&name=${name}&date=${date}`)
        return this.http.get<Customer[]>(this.baseURL + '/customer');
    }

    getSales(username: string): Observable<Order[]> {
        // Maybe pagination on backend
        // return this.http.get(this.baseURL + `/sales?page=${currentPage}&size=${currentPageSize}&name=${name}&date=${date}`)
        return this.http.get<Order[]>(this.baseURL + `/customer/${username}`);
    }

    getProduct(): Observable<Product> {
        return this.http.get<Product>(this.baseURL + '/store/price');
    }

}