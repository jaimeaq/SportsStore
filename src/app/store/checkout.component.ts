import {Component} from "@angular/core";
import {OrderRespository} from "../model/order.respository";
import {Order} from "../model/order.model";
import {NgForm} from "@angular/forms";

@Component({
  templateUrl: "checkout.component.html",
  styleUrls: ["checkout.component.css"]
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(public repository: OrderRespository,
              public order: Order) {}

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.repository.saveOrder(this.order).subscribe(order => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }
}
