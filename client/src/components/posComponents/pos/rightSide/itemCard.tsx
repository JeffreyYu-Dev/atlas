"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMenuStore } from "@/store/menuStore";
import { motion } from "@/components/animations/framer";
import { useOrderStore } from "@/store/orderStore";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export type databaseItemT = {
  category: string;
  name: string;
  price: number;
  description: string;
  created_at: Date;
  upated_at: Date;
};

export type databaseCategoryT = {
  category: string;
  created_at: Date;
  updated_at: Date;
  items: databaseItemT[];
};

const HOLD_TIME = 0.5;

function ItemCards({
  data,
  isCategory,
}: {
  data: databaseItemT[] | databaseCategoryT[] | null;
  isCategory?: boolean;
}) {
  const menuStore = useMenuStore();
  const orderStore = useOrderStore();

  if (!data) return null;

  //   category buttons
  if (isCategory) {
    return (
      <>
        {(data as databaseCategoryT[]).map(
          (item: databaseCategoryT, index: number) => (
            <button
              key={index}
              className={`
        ${
          menuStore.selectedCategory == item.category
            ? "border-app-accent text-app-accent"
            : ""
        }
      h-20 xl:h-28 border-1 overflow-hidden cursor-pointer flex justify-center items-center rounded hover:text-app-accent hover:bg-muted`}
              onClick={() => {
                menuStore.setCategory(item.category);
              }}
            >
              <h1 className="xl:text-xl text-lg font-medium">
                {item.category}
              </h1>
            </button>
          )
        )}
      </>
    );
  }

  //   item buttons
  return (
    <>
      {(data as databaseItemT[]).map((item: databaseItemT, index: number) => (
        <ContextMenu key={index}>
          <ContextMenuTrigger className="xl:h-28 h-20 ">
            <motion.button
              initial={{
                scale: 1,
              }}
              className={` h-full w-full overflow-hidden border-1 cursor-pointer duration-150 hover:bg-muted flex justify-center items-center rounded hover:text-app-accent  ease-in-out`}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0 },
              }}
              onClick={() =>
                orderStore.addItem(
                  orderStore.selectedTab,
                  item.name,
                  item.price,
                  1
                )
              }
            >
              <h1 className=" xl:text-xl font-medium">{item.name}</h1>
            </motion.button>
          </ContextMenuTrigger>
          <ContextMenuContent className="p-0 max-w-[35rem] xl:max-w-[40rem] ">
            <h1 className=" text-lg font-bold p-1">{item.name}</h1>
            <div className="w-full h-px bg-border"></div>
            <p className=" p-1 font-sm text-muted-foreground">Tags:</p>
            <p className="p-1 font-sm text-muted-foreground">Ingredients:</p>
            <p className="p-1 font-sm text-pretty text-muted-foreground">
              Description: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam enim obcaecati, impedit delectus tempora
              aspernatur. Repudiandae esse ullam doloribus dolorum deleniti
            </p>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </>
  );
}

export default ItemCards;
