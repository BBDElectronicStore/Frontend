import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export class ApiService {
    baseURL: string = environment.baseURL;
    header: any; // idk where do to the header and the auth

    constructor(private http: HttpClient){}

    getProduct(): Observable<ArrayBuffer> {
        return this.http.get(this.baseURL + '/product', this.header);
    }

    getAccount(currentPage: number, currentPageSize: number, name: string, date: number): Observable<ArrayBuffer> {
        return this.http.get(this.baseURL + `/account?page=${currentPage}&size=${currentPageSize}&name=${name}&date=${date}`, this.header)
    }

    getSales(currentPage: number, currentPageSize: number, name: string, date: number): Observable<ArrayBuffer> {
        return this.http.get(this.baseURL + `/sales?page=${currentPage}&size=${currentPageSize}&name=${name}&date=${date}`, this.header)
    }

}