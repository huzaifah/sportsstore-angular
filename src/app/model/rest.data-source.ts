import { Injectable } from "@angular/core";
//import { Http, Request, RequestMethod } from "@angular/http";
import {  
    HttpClient,  
    HttpParams,  
    HttpErrorResponse  
} from '@angular/common/http';  
import {  
    HttpHeaders  
} from '@angular/common/http';
import {Observable, of } from "rxjs";
//import { Observable } from "rxjs-compat";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
//import "rxjs-compat/add/operator/map";
import { map } from 'rxjs/operators';

const PROTOCOL = "http";
const PORT = 3500;
const httpOptions = {  
    headers: new HttpHeaders({  
        'Content-Type': 'application/json'  
    })  
};

@Injectable()
export class RestDataSource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products").pipe();
    }

    saveOrder(order: Order): Observable<any> {
        return this.http.post(this.baseUrl + "orders", JSON.stringify(order), httpOptions).pipe();
    }
}
