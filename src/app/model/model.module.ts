import {NgModule} from "@angular/core";
import {ProductRepository} from "./product.repository";
import {StaticDataSource} from "./static.datasource";
import {Cart} from "./cart.model";
import {OrderRespository} from "./order.respository";
import {Order} from "./order.model";


@NgModule({
  providers: [ProductRepository, StaticDataSource, Cart, Order, OrderRespository]
})
export class ModelModule {}
