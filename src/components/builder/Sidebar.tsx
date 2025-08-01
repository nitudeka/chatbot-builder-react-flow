/*
 * Sidebar containing all the available nodes
 */

import React from "react";
import { v4 } from "uuid";
import { useDnD } from "./DnDContext";
import SideDrawer from "../sideDrawer";
import components from "./components";

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = (props) => {
  const [_, setNode] = useDnD();

  const onDragStart = (event: any, component: any) => {
    // we don't need to store the icon of the node
    setNode({ ...component, id: v4(), icon: undefined });
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <SideDrawer title="Nodes" isOpen={props.isOpen} onClose={props.onClose}>
      <div className="pt-2">
        {components.map((component) => {
          return (
            <div
              key={component.type}
              draggable
              onDragStart={(e) => onDragStart(e, component)}
              className="cursor-pointer flex border"
            >
              <div className="border-r flex flex-col items-center justify-center px-2 py-1.5">
                <component.icon />
                <span className="text-xs">{component.label}</span>
              </div>
              <p className="px-2 flex items-center justify-center w-full">
                {component.description}
              </p>
            </div>
          );
        })}
      </div>
    </SideDrawer>
  );
};

export default Sidebar;
