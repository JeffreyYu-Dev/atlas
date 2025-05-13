"use client";
import React, { useEffect } from "react";
import ItemCards from "./rightSide/itemCard";
import { databaseCategoryT } from "./rightSide/itemCard";
import { useMenuStore } from "@/store/menuStore";
import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import OrderContainer from "@/components/posComponents/pos/leftSide/orderContainer";
import POSState from "./POSState";
import CommandBar from "./rightSide/commandBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EmptyMenuPlaceHolder({ isCategory }: { isCategory?: boolean }) {
  return (
    <div className="absolute self-center left-0 right-0 text-center text-muted-foreground">
      <h1 className="font-semibold text-5xl">Nothing to see...</h1>
      {/* TODO: add working link */}
      <h1 className="text-xs mt-4">
        add your first {isCategory ? "category" : "item"} in your
        <Link href={"/pos"} className="underline underline-offset-2">
          {" "}
          dashboard
        </Link>
      </h1>
    </div>
  );
}

function POSSystem({ menuData }: { menuData: databaseCategoryT[] }) {
  const { setMenu, menu, selectedCategory } = useMenuStore();

  useEffect(() => {
    setMenu(menuData);
  }, [menuData, setMenu]);

  function getItemsFromCategory() {
    // if there is no menu
    if (menu == null) return [];
    const category: databaseCategoryT | undefined = menu.find((values) => {
      return values.category == selectedCategory;
    });

    // if there are items in the menu
    if (category) return category.items;

    // no items
    return null;
  }

  const editingModes = ["swap", "add", "remove", "price"];
  const currentEditingMode = editingModes[0];

  return (
    <div className={` h-dvh relative overflow-hidden select-none`}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} maxSize={50}>
          <OrderContainer />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70} maxSize={70} className="flex flex-col">
          {/* <POSState className="flex flex-col"> */}
          <div className="grow">
            <div className="h-1/2 bg-card flex flex-col">
              {currentEditingMode != null && (
                <div className="bg-sky-500 h-12 xl:h-16 flex justify-around items-center">
                  <h1>SWAP</h1>
                  <h1>ADD</h1>
                  <h1>REMOVE</h1>
                  <h1>PRICE</h1>
                </div>
              )}
              <div className="grid p-4 grow xl:grid-cols-6 grid-cols-5 grid-rows-[repeat(auto-fill,5rem)] xl:grid-rows-[repeat(auto-fill,7rem)] gap-2  overflow-y-auto">
                {menu?.length == 0 ? (
                  <EmptyMenuPlaceHolder />
                ) : (
                  <ItemCards
                    data={
                      menu && selectedCategory != null
                        ? getItemsFromCategory()
                        : null
                    }
                  />
                )}
              </div>
            </div>

            {/* bottom half */}
            <div className=" h-1/2 p-2 border-t-8 border-t-app-accent rounded-t-xl ">
              <div className="flex flex-col bg-card rounded border-1 h-full">
                <div
                  className={`grid p-4 xl:grid-cols-6 grid-cols-5 grid-rows-[repeat(auto-fill,5rem)] xl:grid-rows-[repeat(auto-fill,7rem)] gap-2 grow
                  overflow-y-auto`}
                >
                  {menu?.length == 0 ? (
                    <EmptyMenuPlaceHolder isCategory />
                  ) : (
                    <ItemCards data={menu} isCategory />
                  )}
                </div>
                {currentEditingMode === "swap" && (
                  <div className="h-14 border-t-border gap-x-2 border-t-1 flex items-center text-lg font-semibold justify-around">
                    <Button variant={"destructive"} className="">
                      Clear
                    </Button>
                    <div className="flex items-center gap-x-2">
                      <Input
                        className="w-14 focus-visible:ring-0"
                        type="number"
                        inputMode="numeric"
                        defaultValue={1}
                      />
                      <button className="text-sm">
                        seafood cantonese chow mein
                      </button>
                    </div>
                    <h1 className="">to</h1>
                    <div className="flex">
                      <Input
                        className="w-14 focus-visible:ring-0"
                        type="number"
                        inputMode="numeric"
                        defaultValue={1}
                      />
                      <button>item 2</button>
                    </div>
                    <Button disabled className="bg-green-500">
                      Confirm
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <CommandBar />
          {/* </POSState> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default POSSystem;
