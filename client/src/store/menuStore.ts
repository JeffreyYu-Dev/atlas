import { create } from "zustand";
import { databaseCategoryT } from "@/components/posComponents/pos/rightSide/itemCard";

interface menuStoreT {
  selectedCategory: string | null;
  selectedItem: string | null;
  menu: databaseCategoryT[] | null;
  setCategory: (value: string | null) => void;
  setItem: (value: string | null) => void;
  setMenu: (value: databaseCategoryT[]) => void;
}

export const useMenuStore = create<menuStoreT>((set) => ({
  selectedCategory: null,
  selectedItem: null,
  menu: null,
  setCategory: (category: string | null) => {
    set({ selectedCategory: category });
  },
  setItem: (item: string | null) => {
    set({ selectedItem: item });
  },
  setMenu: (menu: databaseCategoryT[]) => {
    set({ menu });
  },
}));
