import {Component, computed, signal, Signal} from "@angular/core";
import {Product} from "../model/product.model";
import {ProductRepository} from "../model/product.repository";

@Component({
  selector: "store",
  templateUrl: "store.component.html"
})
export class StoreComponent {
  products: Signal<Product[]>;
  categories: Signal<string[]>;
  selectedCategory = signal<string | undefined>(undefined);

  constructor(private repository: ProductRepository) {
    this.products = computed(() => {
      if (this.selectedCategory() == undefined) {
        return this.repository.products();
      } else {
        return this.repository.products().filter(p => p.category === this.selectedCategory());
      }
    })
    this.categories = repository.categories;
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory.set(newCategory);
  }
}
