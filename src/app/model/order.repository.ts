import {Injectable, signal} from "@angular/core";
import {Observable} from "rxjs";
import {Order} from "./order.model";
import {RestDataSource} from "./rest.datasource";

@Injectable()
export class OrderRepository {
  private ordersSignal = signal<Order[]>([]);
  private loaded: boolean = false;

  constructor(private dataSource: RestDataSource) {
  }

  loadOrders() {
    this.loaded = true;
    this.dataSource.getOrders().subscribe(data => {
      this.ordersSignal.set(data);
    })
  }

  get orders() {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.ordersSignal.asReadonly();
  }

  saveOrder(order: Order): Observable<Order> {
    this.loaded = false;
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe(updatedOrder => {
      this.ordersSignal.update(orders => {
        const index = orders.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
          const updatedOrders = [...orders]; // Clone the array
          updatedOrders.splice(index, 1, updatedOrder); // Replace the order at the found index
          return updatedOrders;
        }
        return orders; // Return the original array if the order is not found
      });
    });
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe(() => {
      this.ordersSignal.update(orders => {
        const updatedOrders = orders.filter(o => o.id !== id); // Create a new array excluding the order with the given id
        return updatedOrders;
      });
    });
  }
}
