import React from "react";

interface itemCardProps {
  name: string;
  type: string;
}

const types = {
  food: "bg-orange-500",
  category: "bg-sky-500",
};

function ItemCard({ name }: itemCardProps) {
  return (
    <div
      className={` min-h-28 flex justify-center items-center rounded hover:text-app-accent hover:bg-card duration-150 ease-in-out`}
    >
      <h1 className="text-xl font-medium">{name}</h1>
    </div>
  );
}

export default ItemCard;
