// import {computed, Injectable, signal, Signal, WritableSignal} from "@angular/core";
// import {Product} from "./product.model";
//
// @Injectable()
// export class Cart {
//   private linesSignal: WritableSignal<CartLine[]>;
//   public summary: Signal<CartSummary>;
//
//   constructor() {
//     this.linesSignal = signal([]);
//     this.summary = computed(() => {
//       let newSummary = new CartSummary();
//       this.linesSignal().forEach(l => {
//         newSummary.itemCount += l.quantity;
//         newSummary.cartPrice += l.lineTotal;
//       });
//       return newSummary;
//     })
//   }
//
//   get lines(): Signal<CartLine[]> {
//     return this.linesSignal.asReadonly();
//   }
//
//   addLine(product: Product, quantity: number = 1) {
//     this.linesSignal.mutate(linesArray => {
//       let line = linesArray.find(l => l.product.id == product.id);
//       if (line != undefined) {
//         line.quantity += quantity;
//       } else {
//         linesArray.push(new CartLine(product, quantity));
//       }
//     });
//   }
//
//   removeLine(id: number) {
//     this.linesSignal.mutate(linesArray => {
//       let index = linesArray.findIndex(l => l.product.id == id);
//       linesArray.splice(index, 1);
//     });
//   }
//
//   clear() {
//     this.linesSignal.set([]);
//   }
// }
//
// export class CartLine {
//
//   constructor(public product: Product, public quantity: number) { }
//
//   get lineTotal() {
//     return this.quantity * (this.product.price ?? 0);
//   }
// }
//
// export class CartSummary {
//   itemCount: number = 0;
//   cartPrice: number = 0;
// }

/** CODE PROPOSED BY CHATGPT 4o 30/05/2024 **/
import {computed, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {Product} from "./product.model";

@Injectable()
export class Cart {
  private linesSignal: WritableSignal<CartLine[]>;
  public summary: Signal<CartSummary>;

  constructor() {
    this.linesSignal = signal([]);
    this.summary = computed(() => {
      let newSummary = new CartSummary();
      this.linesSignal().forEach(l => {
        newSummary.itemCount += l.quantity;
        newSummary.cartPrice += l.lineTotal;
      });
      return newSummary;
    });
  }

  get lines(): Signal<CartLine[]> {
    return this.linesSignal.asReadonly();
  }

  addLine(product: Product, quantity: number = 1) {
    this.linesSignal.update(linesArray => {
      let updatedLines = [...linesArray]; // Clone the array to avoid mutating the original
      let line = updatedLines.find(l => l.product.id == product.id);
      if (line != undefined) {
        line.quantity += quantity;
      } else {
        updatedLines.push(new CartLine(product, quantity));
      }
      return updatedLines;
    });
  }

  updateQuantity(product: Product, quantity: number) {
    this.linesSignal.update(linesArray => {
      let updatedLines = [...linesArray]; // Clone the array to avoid mutating the original
      let line = updatedLines.find(l => l.product.id == product.id);
      if (line != undefined) {
        line.quantity = Number(quantity);
      }
      return updatedLines;
    });
  }

  removeLine(id: number) {
    this.linesSignal.update(linesArray => {
      let updatedLines = linesArray.filter(l => l.product.id !== id);
      return updatedLines;
    });
  }

  clear() {
    this.linesSignal.set([]);
  }
}

export class CartLine {
  constructor(public product: Product, public quantity: number) {}

  get lineTotal() {
    return this.quantity * (this.product.price ?? 0);
  }
}

export class CartSummary {
  itemCount: number = 0;
  cartPrice: number = 0;
}
