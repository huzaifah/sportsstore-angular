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

    getProducts(): Observable<any> {
        return this.sendRequest("get", this.baseUrl + "products");
    }

    saveOrder(order: Order): Observable<any> {
        return this.sendRequest("post", this.baseUrl + "orders", order, true);
    }

    saveProduct(product: Product): Observable<any> {
        return this.sendRequest("post", this.baseUrl + "products", product, true);
    }

    updateProduct(product: Product): Observable<any> {
        return this.sendRequest("put", this.baseUrl + `products/${product.id}`, product, true);
    }

    deleteProduct(id: number): Observable<any> {
        return this.sendRequest("delete", this.baseUrl + `products/${id}`, null, true);
    }

    getOrders(): Observable<any> {
        return this.sendRequest("get", this.baseUrl + "orders");
    }

    deleteOrder(id: number): Observable<any> {
        return this.sendRequest("delete", this.baseUrl + `orders/${id}`, null, true);
    }

    updateOrder(order: Order): Observable<any> {
        return this.sendRequest("put", this.baseUrl + `orders/${order.id}`, order, true);
    }

    private sendRequest(verb: string,
        url: string,
        body?: Product | Order,
        auth: boolean = false) : Observable<Product | Product[] | Order | Order[]> {

            let httpHeaders = new HttpHeaders()
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer<${this.auth_token}`);

                switch (verb) {
                    case "get":                     
                        return this.http.get<Product | Product[] | Order | Order[]>(
                            url, { headers: httpHeaders }
                            ).pipe();

                        break;
                
                    case "post":                     
                        return this.http.post(
                            url, JSON.stringify(body), { headers: httpHeaders }
                            ).pipe();

                        break;

                    case "put":
                        return this.http.put(url, body, { headers: httpHeaders });

                        break;

                    case "delete":
                        return this.http.delete(url, { headers: httpHeaders });

                        break;
                    default:
                        break;
                }
        }
}
