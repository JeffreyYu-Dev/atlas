"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useOrderStore } from "@/store/orderStore";

import {
  NotepadText,
  Trash,
  Undo,
  Pencil,
  Star,
  Book,
  Navigation,
  Search,
} from "lucide-react";

// IN here add groups at the button and on the righht side, like different kinds of multi order(e.g. someone ordering for someone else and ur self, or ordering under one person split)
// grouping functionality like certain multi order groups under group 1 and thhe rest under group 2
function CommandBar() {
  const orderStore = useOrderStore();

  return (
    <div className="mb-2 mx-2 border-1 grow flex items-center justify-around rounded bg-card max-h-12 xl:max-h-20">
      <Dialog>
        <DialogTrigger>
          <NotepadText />
        </DialogTrigger>
        <DialogContent className="w-9/12 h-10/12 bg-card">
          <DialogHeader className="bg-sky-500">
            <DialogTitle className="self-center text-2xl">Details</DialogTitle>
            <DialogDescription>hi</DialogDescription>
          </DialogHeader>
          <div className="bg-green-500">hi</div>
          <DialogFooter className="bg-orange-500">hi</DialogFooter>
        </DialogContent>
      </Dialog>
      <Trash />
      <Undo />
      <Pencil />
      <Star />
      <Book />
      <Navigation />
      <Search />
    </div>
  );
}

export default CommandBar;
