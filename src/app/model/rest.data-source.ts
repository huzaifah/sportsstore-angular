import { Injectable } from "@angular/core";
//import { Http, Request, RequestMethod } from "@angular/http";
import {  
    HttpClient,  
    HttpParams,  
    HttpErrorResponse,
    HttpRequest
} from '@angular/common/http';  
import {  
    HttpHeaders  
} from '@angular/common/http';
import { Observable, of } from "rxjs";
//import { Observable } from "rxjs-compat";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
//import "rxjs-compat/add/operator/map";
import { map } from 'rxjs/operators';

const PROTOCOL = "http";
const PORT = 3500;
let httpOptions = {  
    headers: new HttpHeaders({  
        'Content-Type': 'application/json'  
    })
};

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<any>(
            this.baseUrl + "login",
            { name: user, password: pass })
            .pipe(map(response => {
                let r = response;
                this.auth_token = r.success ? r.token : null;
                return r.success;
            }));
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products").pipe();
    }

    saveOrder(order: Order): Observable<any> {
        return this.http.post(this.baseUrl + "orders", JSON.stringify(order), httpOptions).pipe();
    }

    private sendRequest(verb: string,
        url: string,
        body?: Product | Order,
        auth: boolean = false) : Observable<Product | Product[] | Order | Order[]> {
                
            if (auth && this.auth_token != null) {
                httpOptions.headers.append('authorization', `Bearer<${this.auth_token}`);
            }

                switch (verb) {
                    case "get":                     
                        return this.http.get(
                            url, httpOptions
                            ).pipe();

                        break;
                
                    case "post":                     
                        return this.http.post(
                            url, JSON.stringify(body), httpOptions
                            ).pipe();

                        break;

                    default:
                        break;
                }
        }
}
