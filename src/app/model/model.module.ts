import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";
import { RestDataSource } from "./rest.data-source";
//import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [ProductRepository, { provide: StaticDataSource, useClass: RestDataSource }
        , Cart, OrderRepository, Order],

})

export class ModelModule { }