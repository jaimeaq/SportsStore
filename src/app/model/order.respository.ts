import {Injectable} from "@angular/core";
import {StaticDataSource} from "./static.datasource";
import {Observable} from "rxjs";
import {Order} from "./order.model";

@Injectable()
export class OrderRespository {
  constructor(private dataSource: StaticDataSource) {
  }

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }
}
