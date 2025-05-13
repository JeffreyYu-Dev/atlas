import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { X, Plus } from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { tabT } from "@/store/orderStore";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { order } from "@/store/orderStore";

function Tab({
  order,
  tabs,
  index,
  selectedTab,
  changeTab,
  removeTab,
}: {
  order: tabT;
  tabs: order[];
  index: number;
  selectedTab: number;
  removeTab: (index: number) => void;
  changeTab: (index: number) => void;
}) {
  return (
    <div className="grow shrink-0 h-10 flex items-center gap-x-1">
      <div
        className={`flex items-center w-full h-full rounded cursor-pointer ${
          order.tab.index == selectedTab ? "bg-app-accent" : "hover:bg-muted"
        }`}
      >
        {/* tab  */}
        <h1
          className="ml-2 text-sm font-semibold w-full h-full flex items-center"
          onClick={() => changeTab(order.tab.index)}
        >
          {order.tab.name}
        </h1>
        {/* remove tab button */}
        {tabs.length != 1 && (
          <Dialog>
            <DialogTrigger
              asChild
              className={`ml-auto mr-2 hover:rounded-full ${
                selectedTab == order.tab.index
                  ? "hover:text-background "
                  : "hover:text-red-500"
              } cursor-pointer duration-300 `}
            >
              <X size={24} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-card">
              <DialogHeader className="">
                <DialogTitle className="left-0 text-2xl">
                  Delete {order.tab.name}?
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this tab?
                </DialogDescription>
              </DialogHeader>
              {/* add extra content here */}
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="cursor-pointer basis-3/4"
                  >
                    Close
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="bg-red-500 dark:hover:bg-red-500 duration-300 ease-in-out cursor-pointer grow"
                    onClick={() => removeTab(order.tab.index)}
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {index != tabs.length - 1 && (
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-1/2 data-[orientation=vertical]:w-0.5"
        />
      )}
    </div>
  );
}

function Tabs({
  setIsMultiOrder,
}: {
  setIsMultiOrder: Dispatch<SetStateAction<boolean>>;
}) {
  const { addTab, removeTab, changeTab, selectedTab, tabs } = useOrderStore();

  useEffect(() => {
    setIsMultiOrder(tabs.length > 1);
  }, [tabs, setIsMultiOrder]);

  return (
    <div className="bg-card border-1 rounded flex items-center ">
      {/*  render each tab */}
      <div className="flex p-1 gap-x-1 w-full overflow-x-auto no-scrollbar">
        {tabs.map((order, index) => {
          return (
            <Tab
              key={index}
              order={order.getOrderDetails()}
              index={index}
              removeTab={removeTab}
              changeTab={changeTab}
              selectedTab={selectedTab}
              tabs={tabs}
            />
          );
        })}
      </div>

      {/* ADD TAB UI */}
      <div className="bg-card h-full flex items-center gap-1 grow-0">
        <Separator orientation="vertical" />
        <span className="flex items-center justify-center w-10 mr-1">
          <button
            className="hover:bg-muted rounded-xl p-2 cursor-pointer"
            onClick={() => addTab()}
          >
            <Plus size={16} className="" />
          </button>
        </span>
      </div>
    </div>
  );
}

export default Tabs;
