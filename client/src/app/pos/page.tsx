import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ItemCard from "@/components/posComponents/pos/itemCards/itemCard";
import ControlCenter from "@/components/posComponents/pos/controlCenter/controlCenter";

const POS = () => {
  return (
    <div className="h-dvh relative">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className=" min-w-1/4 max-w-1/3" defaultSize={25}>
          One
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default POS;
