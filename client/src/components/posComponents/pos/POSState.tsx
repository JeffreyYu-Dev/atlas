import React from "react";
import CommandBar from "./rightSide/commandBar";

function POSState({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`${className} h-dvh`}>
      <h1 className="h-14 bg-card mx-2 mb-2 rounded border-1">hi</h1>
      {children}
      <h1 className="h-14 bg-card mx-2 mb-2 rounded border-1">hi</h1>
      <CommandBar />
    </div>
  );
}

export default POSState;
