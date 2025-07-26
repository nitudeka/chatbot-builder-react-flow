import { useMemo } from "react";
import type { NodeProps } from "@xyflow/react";
import BuilderHandle from "../Handle";
import { useConfigureNode } from "../contexts/ConfigureNodeContext";
import type { NodeData, NodeTypes } from "../types";

// import all the available nodes
import NodeMessage from "./Message";

const nodes: { [key in NodeTypes]: React.FC<Partial<NodeData>> } = {
  message: NodeMessage,
};

// Custom node component for React Flow
const Nodes: React.FC<{ data: NodeData } & NodeProps> = (props) => {
  // Access selected node and setter from context
  const { selectedNode, setSelectedNode } = useConfigureNode();

  const Node = nodes[props.data.type] || (() => <></>);

  // Handle node click to select for configuration
  const onNodeClick = () => {
    setSelectedNode(props.data);
  };

  // Determine if this node is currently selected
  const isNodeSelected = useMemo(() => {
    return selectedNode?.id === props.data?.id;
  }, [selectedNode, props.data?.id]);

  return (
    // Node UI with selection highlight and handles
    <div
      onClick={onNodeClick}
      className="cursor-pointer relative inline-block px-4 py-2 font-medium group"
    >
      <span
        className={[
          isNodeSelected
            ? "-translate-y-0 -translate-x-0"
            : "translate-x-1 translate-y-1",
          "absolute inset-0 w-full h-full transition duration-200 ease-out transform bg-black group-hover:-translate-x-0 group-hover:-translate-y-0",
        ].join(" ")}
      ></span>
      <span
        className={[
          isNodeSelected ? "bg-black" : "bg-white",
          "absolute inset-0 w-full h-full border-2 border-black group-hover:bg-black",
        ].join(" ")}
      ></span>
      <div
        className={[
          isNodeSelected ? "text-white" : "text-black",
          "relative group-hover:text-white",
        ].join(" ")}
      >
        <p className="text-sm">{props.data.label}</p>
	<Node { ...props.data } />
        {/* Handles for connecting nodes */}
        <BuilderHandle
          type="target"
          position="top"
          handleId={props.data.id}
          isConnectable={true}
        />
        <BuilderHandle
          type="source"
          position="bottom"
          handleId={props.data.id}
        />
      </div>
    </div>
  );
};

export default Nodes;
