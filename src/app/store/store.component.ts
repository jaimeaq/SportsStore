import {Component, Signal} from "@angular/core";
import {Product} from "../model/product.model";
import {ProductRepository} from "../model/product.repository";

@Component({
  selector: "store",
  templateUrl: "store.component.html"
})
export class StoreComponent {
  products: Signal<Product[]>;
  categories: Signal<string[]>;

  constructor(private repository: ProductRepository) {
    this.products = repository.products;
    this.categories = repository.categories;
  }
}
