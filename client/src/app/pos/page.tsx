import React from "react";
import POSSystem from "@/components/posComponents/pos/POSSystem";

const POS = async () => {
  const data = await fetch("http://localhost:4000/menu")
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return <POSSystem menuData={data.menu} />;
};

export default POS;
