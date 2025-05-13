"use client";
import {
  groupItemT,
  itemT,
  modifiersT,
  swapT,
  useOrderStore,
} from "@/store/orderStore";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { formatPricing, isModifier } from "@/utils/utils";
import { Trash, X } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Swap({ swaps }: { swaps: swapT[] }) {
  return (
    <ul className="ml-8 text-muted-foreground text-sm xl:text-base">
      {swaps.map((swap, index) => {
        return (
          <li key={index}>
            <div className="flex justify-between items-center mt-4">
              <div className="basis-10/12 flex items-center leading-4">
                <h1 className="grow">{`${
                  swap.from.quantity == 1 ? "" : `${swap.from.quantity}x`
                } ${swap.from.item}`}</h1>
                <span className="text-nowrap  basis-2/12">{"-->"}</span>
                <h1 className=" grow">{`${
                  swap.to.quantity == 1 ? "" : `${swap.to.quantity}x`
                } ${swap.to.item}`}</h1>
              </div>
              <h1>{swap.price}</h1>
            </div>
            <Modifiers
              className="leading-4 ml-8"
              swap
              modifiers={swap.modifiers}
            />
          </li>
        );
      })}
    </ul>
  );
}

function Mod({
  swap,
  mod,
  type,
}: {
  type: "add" | "no";
  mod: { name: string; price: number };
  swap?: boolean;
}) {
  return (
    <li className="flex justify-between">
      <h1>{`${swap ? "|-> " : "- "} ${type} ${mod.name}`}</h1>
      <h1>{mod.price}</h1>
    </li>
  );
}

function Modifiers({
  className,
  swap,
  modifiers,
}: {
  modifiers: modifiersT;
  className: string;
  swap?: boolean;
}) {
  return (
    <ul
      className={` text-muted-foreground flex flex-col gap-y-1.5 text-sm xl:text-base ${className}`}
    >
      {modifiers.add.map((mod, index) => (
        <Mod swap={swap} mod={mod} key={index} type="add" />
      ))}

      {modifiers.remove.map((mod, index) => (
        <Mod swap={swap} mod={mod} key={index} type="no" />
      ))}
    </ul>
  );
}

function Item({
  tabIndex,
  item,
  classname,
  selectedItem,
  setSelectedItem,
}: {
  tabIndex: number;
  item: itemT | groupItemT | modifiersT;
  classname?: string;
  selectedItem: itemT | null;
  setSelectedItem: Dispatch<SetStateAction<itemT | null>>;
}) {
  // close contextMenu on enter
  const contextMenuRef = useRef(null);
  const closeContextMenu = () => {
    if (contextMenuRef.current) {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    }
  };
  const [quantity, setQuantity] = useState<number>(1);
  const orderStore = useOrderStore();

  // TODO: GOTTA WORK ON THIS ONE
  if (isModifier(item)) return null;

  const itemPrice = formatPricing(Number(item.price * item.quantity));

  return (
    <ContextMenu>
      <ContextMenuTrigger className="m-1">
        <button
          className={`${classname} ${
            selectedItem != null && selectedItem.id == item.id
              ? "border-app-accent"
              : "border-transparent "
          } border-1 rounded w-full`}
          onClick={() => setSelectedItem(item)}
        >
          {/* Display item and price container */}
          {/* TODO: if modifiers and swaps make price go up should it modify the item price or just be added to total of tab */}
          <div className=" flex items-center text-base xl:text-lg font-semibold">
            <div className="flex w-full justify-between items-center pl-4 py-4">
              <h1>{`${item.quantity == 1 ? "" : `${item.quantity}x`} ${
                item.name
              }`}</h1>
              <h1>{itemPrice}</h1>
            </div>
            <span className=" px-4 flex item justify-center">
              <X
                size={20}
                className="hover:text-red-500 duration-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  orderStore.removeItem(tabIndex, item.id);
                }}
              />
            </span>
          </div>

          {/* swap list */}
          <Swap swaps={item.swaps} />

          {/* modifiers GLOBAL MODS TODO: change this*/}
          <Modifiers className="leading-4" modifiers={item.modifiers} />
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent ref={contextMenuRef}>
        <ContextMenuItem className="">
          <button>Split 1x {item.name} </button>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <form
          className="h-fit w-48 flex items-center p-1 gap-x-1"
          onSubmit={(e) => {
            e.preventDefault();
            orderStore.changeItemQuantity(
              orderStore.selectedTab,
              item.id,
              quantity
            );
            closeContextMenu();
          }}
        >
          <Input
            className="w-22 shrink-0 focus-visible:ring-0"
            placeholder="Quantity"
            inputMode="numeric"
            type="number"
            onChange={(e) =>
              setQuantity(
                e.target.value ? Number(e.target.value) : item.quantity
              )
            }
            defaultValue={item.quantity}
          />

          <Button
            className="grow"
            variant={quantity <= 0 ? "destructive" : "default"}
          >
            {quantity <= 0 ? <Trash /> : "Confirm"}
          </Button>
        </form>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// TODO: the ui needs serious rework too clunky
function OrderList() {
  const [selectedItem, setSelectedItem] = useState<itemT | null>(null);
  const orderStore = useOrderStore();
  const currentTab = orderStore.selectedTab;
  const items = orderStore.tabs[currentTab]?.getOrder().items || [];

  return (
    <div className="flex-1 overflow-y-auto mt-2 no-scrollbar bg-card border-1 rounded flex flex-col">
      {items.map((item, index) => (
        <Item
          key={index}
          tabIndex={currentTab}
          item={item}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          //   TODO: this enables the alternating colours
          //   classname={`${index % 2 == 0 ? "bg-muted" : "bg-card "}`}
        />
      ))}
    </div>
  );
}

export default OrderList;
