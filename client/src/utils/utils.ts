import { groupItemT, itemT, modifiersT } from "@/store/orderStore";
import { nanoid } from "nanoid";

function generateRandomID() {
  return nanoid();
}

function isItem(obj: itemT | groupItemT | modifiersT): obj is itemT {
  return false;
}

function isGroupItem(obj: itemT | groupItemT | modifiersT): obj is groupItemT {
  return false;
}

function isModifier(obj: itemT | groupItemT | modifiersT): obj is modifiersT {
  return false;
}

function formatPricing(price: number): string {
  const roundedPrice = parseFloat(price.toString()).toFixed(2);
  return roundedPrice;
}

export { generateRandomID, isItem, isGroupItem, isModifier, formatPricing };
