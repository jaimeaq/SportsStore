import {computed, Injectable, signal, Signal} from "@angular/core";
import {Product} from "./product.model";
import {RestDataSource} from "./rest.datasource";

@Injectable()
export class ProductRepository {
  products = signal<Product[]>([]);
  categories: Signal<string[]>;

  constructor(private dataSource: RestDataSource) {
    dataSource.products.subscribe(data => {
      this.products.set(data);
    })
    this.categories = computed(() => {
      return this.products()
        .map(p => p.category ?? "(None)")
        .filter((c, index, array) => array.indexOf(c) == index).sort();
    })
  }

  getProduct(id: number): Product | undefined {
    return this.products().find(p => p.id == id);
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.dataSource.saveProduct(product)
        .subscribe(p => {
          this.products.update(pdata => [...pdata, p]); // Append the new product
        });
    } else {
      this.dataSource.updateProduct(product)
        .subscribe(p => {
          this.products.update(pdata => {
            const index = pdata.findIndex(p => p.id == product.id);
            if (index !== -1) {
              const updatedProducts = [...pdata]; // Clone the array
              updatedProducts.splice(index, 1, product); // Replace the product at the found index
              return updatedProducts;
            }
            return pdata; // Return the original array if the product is not found
          });
        });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => {
      this.products.update(pdata => {
        const updatedProducts = pdata.filter(p => p.id !== id); // Create a new array excluding the product with the given id
        return updatedProducts;
      });
    });
  }
}
