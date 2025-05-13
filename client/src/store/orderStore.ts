import { create } from "zustand";
import { generateRandomID } from "@/utils/utils";
import { isGroupItem, isItem, isModifier } from "@/utils/utils";

type paymentMethodsT = "cash" | "debit" | "credit" | null;

export type modifiersT = {
  add: { name: string; price: number }[];
  remove: { name: string; price: number }[];
};

export type swapT = {
  id: string;
  from: {
    quantity: number;
    item: string;
  };
  to: {
    quantity: number;
    item: string;
  };
  price: number;
  modifiers: modifiersT;
};

export type itemT = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  modifiers: modifiersT;
  swaps: swapT[];
};

export type groupItemT = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  modifiers: modifiersT;
  swaps: swapT[];
  items: itemT[];
};

type timestampsT = {
  placed: string;
  wait: number;
  scheduled?: string | null;
  completed: string;
};

type orderT = {
  id: string;
  time: timestampsT;
  items: (groupItemT | itemT | modifiersT)[];
};

type personalT = {
  names: string[];
  phones: number[];
  delivery: deliveryT;
  notes: string;
};

type paidT = {
  amount: number;
  initial: number;
  remaining: number;
};

type paymentT = {
  method: paymentMethodsT;
  paid: paidT;
};

type pricingT = {
  discount: number;
  tax: number;
  giftCard: number;
  deliveryFee: number;
  additionalFee: number;
  subtotal: number;
  total: number;
};

type deliveryT = {
  address: {
    number: number;
    street: string;
    apartment: {
      room: number | string;
      buzzer: number | string;
    };
  };
  notes: string;
};

export type tabT = {
  tab: {
    name: string | number;
    index: number;
    total: number;
  };
  order: orderT;
  personal: personalT;
  payment: paymentT;
  pricing: pricingT;
};

interface orderStoreI {
  tabs: order[];
  selectedTab: number;
  addTab: () => void;
  removeTab: (index: number) => void;
  changeTab: (index: number) => void;
  renameTab: (index: number, newName: string) => void;
  setTimestamps: (index: number, timestamps: timestampsT) => void;
  addItem: (
    index: number,
    name: string,
    price: number,
    quantity: number
  ) => void;
  removeItem: (index: number, itemId: string) => void;
  setTabs: (tabs: order[]) => void;
  changeItemQuantity: (index: number, id: string, quantity: number) => void;
}

// this probably isn't the best way to do it but idk
export class order {
  private orderDetails: tabT;

  // a new order beings when a new tab is created
  constructor(tab: number, totalTabs: number) {
    // everything in the template is temporary except the tab index
    this.orderDetails = {
      // tab details
      tab: {
        name: tab + 1,
        index: tab,
        // e.g. someone places 3 orders, this can be used to show 1/3, 2/3, 3/3 for _______
        total: totalTabs,
      },
      //   general order details
      order: {
        id: generateRandomID(),
        time: {
          placed: "",
          wait: 0,
          scheduled: null,
          completed: "",
        },
        items: [],
      },
      //   personal info
      personal: {
        names: [],
        phones: [],
        delivery: {
          address: {
            number: 0,
            street: "",
            apartment: {
              room: "",
              buzzer: 0,
            },
          },
          notes: "",
        },
        notes: "",
      },

      // payment
      payment: {
        method: null,
        paid: {
          amount: 0,
          initial: 0,
          remaining: 0,
        },
      },
      pricing: {
        discount: 0,
        giftCard: 0,
        deliveryFee: 0,
        additionalFee: 0,
        tax: 0,
        subtotal: 0,
        total: 0,
      },
    };
  }

  //   random functions
  //   ------------------------------------------
  private orderWithouGlobalModifiers() {
    return this.orderDetails.order.items.filter((item) => {
      if (!isModifier(item)) return true;
    });
  }

  //   rename tab function
  renameTab(name: string | number) {
    this.orderDetails.tab.name = name;
  }

  updateTabTotal(total: number) {
    this.orderDetails.tab.total = total;
  }

  //   [1,2,3] removing 2 from the array the indexes stores inside the order aren't the same anymore because they're out of sync with the array
  updateTabIndex(index: number) {
    this.orderDetails.tab.index = index;

    if (typeof this.orderDetails.tab.name === "number")
      this.orderDetails.tab.name = index;
  }

  //   order functions
  // ----------------------------------

  setTimestamps(timestamps: timestampsT) {
    this.orderDetails.order.time = timestamps;
  }

  //   item functions
  //   --------------------------------------

  //   not sure what to use this for( may for split items?)
  //   changeItemId(newItemId: string) {
  //   }

  addItem(item: itemT | groupItemT, quantity: number) {
    const itemInOrder = this.orderDetails.order.items.find((itemInOrder) => {
      if (isModifier(itemInOrder)) return null;
      return itemInOrder.name == item.name;
    });

    if (!itemInOrder) {
      this.orderDetails.order.items.push(item);
      return;
    }

    if (!isModifier(itemInOrder)) {
      itemInOrder.quantity += quantity;
    }
  }

  removeItem(id: string, quantity: number) {
    const itemInOrder = this.orderDetails.order.items.find((itemInOrder) => {
      if (isModifier(itemInOrder)) return null;
      return itemInOrder.id == id;
    });

    if (quantity <= 0) {
      this.orderDetails.order.items = this.orderDetails.order.items.filter(
        (item) => {
          if (isModifier(item)) return true;

          return item.id != id;
        }
      );
    }

    if (!itemInOrder || isModifier(itemInOrder)) return;

    itemInOrder.quantity -= quantity;

    if (itemInOrder.quantity <= 0) {
      this.orderDetails.order.items = this.orderDetails.order.items.filter(
        (item) => {
          if (isModifier(item)) return true;

          return item.id != id;
        }
      );
    }
  }

  setItems(items: (itemT | groupItemT | modifiersT)[]): void {
    this.orderDetails.order.items = items;
  }

  //   TODO: set quantity might be added
  changeItemQuantity(id: string, quantity: number) {
    this.orderDetails.order.items.forEach((item) => {
      if (isModifier(item)) return null;

      if (quantity <= 0) {
        this.removeItem(id, quantity);
        return;
      }
      if (item.id == id) item.quantity = quantity;
    });
  }

  changeItemPrice(price: number) {}
  addModifier(modifier: string) {}
  removeModifier(modifier: string) {}
  addSwap(from: itemT, to: itemT, quantity: number = 1) {}
  changeSwapPrice() {}
  removeSwap(swapId: string) {}

  // personal function
  // -------------------------

  addName(name: string) {
    this.orderDetails.personal.names.push(name);
  }

  removeName(nameToBeRemoved: string) {
    this.orderDetails.personal.names.filter((name) => name != nameToBeRemoved);
  }

  addPhone(phone: number) {
    this.orderDetails.personal.phones.push(phone);
  }

  removePhone(phoneToBeRemoved: number) {
    this.orderDetails.personal.phones.filter(
      (phone) => phone != phoneToBeRemoved
    );
  }

  setDelivery(delivery: deliveryT) {
    this.orderDetails.personal.delivery = delivery;
  }

  setOrderNote(note: string) {
    this.orderDetails.personal.notes = note;
  }

  //   payment functions
  //-----------------
  setPaymentMethod(method: paymentMethodsT) {
    this.orderDetails.payment.method = method;
  }

  setPaymentPaid(paid: paidT) {
    this.orderDetails.payment.paid = paid;
  }

  //   pricing stuff
  //   -----------------------
  //   TODO: work on pricing calculations
  //   calculatePricing() {
  //     // get from browser redis/database
  //     const taxPercentage = 0.13;
  //     // get from browser redis/database
  //     const discountPercentage = 0.1;

  //     let subtotal = 0;

  //     // TODO: this might need a rework once we start testing
  //     this.orderDetails.order.items.forEach((item: itemT | modifiersT) => {
  //       if (this.isItem(item)) {
  //         // calculate base
  //         subtotal += item.price * item.quantity;

  //         // add swaps prices
  //         item.swaps.forEach((swap) => {
  //           subtotal += swap.price;
  //         });

  //         // add modifiers
  //       }
  //     });

  //     const deliveryFee = this.orderDetails.personal.delivery.deliveryFee;
  //     const additionalDeliveryFree =
  //       this.orderDetails.personal.delivery.additionalFee;

  //     const totalDeliveryFee = deliveryFee + additionalDeliveryFree;

  //     // const total = totalDeliveryFee +
  //   }

  //  order information
  // ---------------

  getTab() {
    return this.orderDetails.tab;
  }

  getOrder() {
    return this.orderDetails.order;
  }

  getPersonal() {
    return this.orderDetails.personal;
  }

  getPayment() {
    return this.orderDetails.payment;
  }

  getPricing() {
    return this.orderDetails.pricing;
  }

  getOrderDetails() {
    return this.orderDetails;
  }
}

// find the next tab
// todo: this needs rework, the removeTab function now automatically have them in ascending order so simply get the next number
function findNextTabNumber(list: order[]): number {
  const sortedArr = [...list].sort(
    (a, b) => a.getOrderDetails().tab.index - b.getOrderDetails().tab.index
  );

  // just in case
  if (sortedArr.length == 0) {
    return 1;
  }

  if (sortedArr[0].getOrderDetails().tab.index != 0) {
    return 1;
  }

  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (
      sortedArr[i + 1].getOrderDetails().tab.index -
        sortedArr[i].getOrderDetails().tab.index >
      1
    ) {
      return sortedArr[i].getOrderDetails().tab.index + 1;
    }
  }
  return sortedArr[sortedArr.length - 1].getOrderDetails().tab.index + 1;
}

// TODO: re add <orderStoreI>
export const useOrderStore = create<orderStoreI>((set) => ({
  tabs: [new order(0, 0)],
  selectedTab: 0,

  renameTab: (index: number, newName: string): void =>
    set((state) => {
      const tabs = [...state.tabs];
      tabs[index].renameTab(newName);
      return { tabs };
    }),

  setTimestamps: (index: number, timestamps: timestampsT): void =>
    set((state) => {
      const tabs = [...state.tabs];
      tabs[index].setTimestamps(timestamps);
      return { tabs };
    }),

  addItem(index: number, name: string, price: number, quantity: number): void {
    const itemId = generateRandomID();

    set((state) => {
      const tabs = [...state.tabs];

      //   // we need to first check if the item is already in the order
      //   const item = tabs[state.selectedTab]
      //     .getOrder()
      //     .items.find(
      //       (
      //         item: groupItemT | itemT | modifiersT
      //       ): groupItemT | itemT | modifiersT | null => {
      //         if (isModifier(item)) return null;
      //         return item.name == name ? item : null;
      //       }
      //     );

      tabs[index].addItem(
        {
          id: itemId,
          quantity: quantity,
          name: name,
          price: price,
          modifiers: {
            add: [
              // { name: "mushrooms", price: 2 },
              // { name: "tomatoes", price: 1 },
            ],
            remove: [
              // { name: "green peppers", price: 5 },
              // { name: "soy sauce", price: 2 },
            ],
          },
          swaps: [
            //   {
            //     id: "091823091823098120398",
            //     from: { quantity: 1, item: "apple" },
            //     to: { quantity: 2, item: "orange" },
            //     price: 5,
            //     modifiers: {
            //       add: [],
            //       remove: [],
            //     },
            //   },
            //   {
            //     id: "0193097932864086234",
            //     from: { quantity: 700, item: "seafood cantonese chow mein" },
            //     to: { quantity: 700, item: "seafood cantonese chow mein" },
            //     price: 5000,
            //     modifiers: {
            //       add: [
            //         {
            //           name: "peppers",
            //           price: 2,
            //         },
            //       ],
            //       remove: [],
            //     },
            //   },
            //   {
            //     id: "091823091823098120398",
            //     from: { quantity: 1, item: "apple" },
            //     to: { quantity: 2, item: "orange" },
            //     price: 5,
            //     modifiers: {
            //       add: [],
            //       remove: [],
            //     },
            //   },
            //   {
            //     id: "091823091823098120398",
            //     from: { quantity: 1, item: "apple" },
            //     to: { quantity: 2, item: "orange" },
            //     price: 5,
            //     modifiers: {
            //       add: [],
            //       remove: [],
            //     },
            //   },
          ],
        },
        1
      );

      return { tabs };
    });
  },

  removeItem: (index: number, itemId: string) => {
    set((state) => {
      const tabs = [...state.tabs];
      tabs[index].removeItem(itemId, 1);
      return { tabs };
    });
  },
  changeItemQuantity: (index: number, id: string, quantity: number) => {
    set((state) => {
      const tabs = [...state.tabs];
      tabs[index].changeItemQuantity(id, quantity);
      return { tabs };
    });
  },

  // orderstore functions not related to the order class but

  setTabs: (tabs: order[]): void => {
    set({ tabs });
  },

  addTab: (): void => {
    set((state) => {
      const newTab = findNextTabNumber(state.tabs);
      const newOrder = new order(newTab, newTab);

      // we need to update all the previously made orders to update their tab totals
      const tabs = [...state.tabs];
      tabs.forEach((tab) => tab.updateTabTotal(newTab));
      return { tabs: [...tabs, newOrder], selectedTab: state.selectedTab + 1 };
    });
  },

  removeTab: (index: number): void => {
    set((state) => {
      if (state.tabs.length > 1) {
        const filteredTabs = state.tabs.filter(
          (order) => order.getOrderDetails().tab.index != index
        );

        // update all tab indexs based on the array and selected tab and update the names

        filteredTabs.forEach((tab, index) => {
          tab.updateTabIndex(index);
          tab.renameTab(
            typeof tab.getTab().name === "number" && tab.getTab().name == index
              ? index + 1
              : "poo"
          );
        });

        // todo: fix up the tab switch to neighbours instead of always being first
        return {
          selectedTab: state.tabs[0].getTab().index,
          tabs: [...filteredTabs],
        };
      }
      return { tabs: [...state.tabs] };
    });
  },

  changeTab: (index: number): void => set({ selectedTab: index }),
}));
