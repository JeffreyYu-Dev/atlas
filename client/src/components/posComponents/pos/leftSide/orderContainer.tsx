"use client";
import React, { useState } from "react";
import Tabs from "./tabs";
import OrderList from "./orderlist";
import { useOrderStore } from "@/store/orderStore";
import { formatPricing } from "@/utils/utils";

function DetailDisplay({
  grande,
  detail,
  value,
  className,
}: {
  grande?: boolean;
  detail: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between font-semibold ${
        grande ? "text-lg" : "text-sm text-muted-foreground"
      } ${className}`}
    >
      <h1>{detail}</h1>
      <h1>{value}</h1>
    </div>
  );
}

// TODO: fix this after creating order list container
function DisplayPrice({ className }: { className?: string }) {
  const orderStore = useOrderStore();
  const selectedTab = orderStore.selectedTab;
  const tab = orderStore.tabs[selectedTab];
  const pricingDetails = tab.getPricing();
  const subtotal = formatPricing(pricingDetails.subtotal);
  const giftCard = formatPricing(pricingDetails.giftCard);
  const discount = formatPricing(pricingDetails.discount);
  const delivery = formatPricing(pricingDetails.deliveryFee);
  const additionalDelivery = formatPricing(pricingDetails.additionalFee);
  const tax = formatPricing(pricingDetails.tax);
  const total = formatPricing(pricingDetails.total);

  return (
    <div className={`${className} flex flex-col gap-y-1`}>
      <DetailDisplay detail="Subtotal" value={subtotal} />
      <DetailDisplay detail="tax" value={tax} />
      <DetailDisplay detail="Discount" value={discount} />
      <DetailDisplay detail="Delivery" value={delivery} />
      <DetailDisplay detail="Total" value={total} grande className="mt-auto" />
    </div>
  );
}

function OrderContainer() {
  const [isMultiOrder, setIsMultiOrder] = useState(false);
  const [editingItem, setEditingItem] = useState(false);

  return (
    <div className="h-dvh max-h-dvh flex flex-col overflow-hidden p-2 ">
      {/* Tabs section */}
      <Tabs setIsMultiOrder={setIsMultiOrder} />

      {/* Main content area - scrollable */}
      <OrderList />

      {/* Fixed footer section */}
      <div className="flex flex-col gap-y-2 mt-2">
        {/* Price of the tab - always visible */}
        <DisplayPrice className="bg-card p-4 border-1 rounded" />

        {/* Multi order price of ALL tabs - conditionally visible */}
        {isMultiOrder && (
          <DisplayPrice className="bg-card p-4 rounded-xl border-t-6 border-app-accent" />
        )}
      </div>
    </div>
  );
}

export default OrderContainer;
