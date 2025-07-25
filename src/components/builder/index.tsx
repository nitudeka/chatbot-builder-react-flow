// Main builder component for the chatbot flow editor
import { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";
import {
  ReactFlow,
  Background,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  type ReactFlowInstance,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from "@xyflow/react";
import { toast } from "react-toastify";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import CustomNode from "./nodes";
import Button from "../button";
import Sidebar from "./Sidebar";
import { DnDProvider, useDnD } from "./DnDContext";
import {
  ConfigureNodeProvider,
  useConfigureNode,
} from "./contexts/ConfigureNodeContext";
import NodeConfigurationSidebar from "./NodeConfigurationSidebar";
import "@xyflow/react/dist/style.css";
import { FLOW_SAVE_KEY } from "../../constants";

// Node type mapping for React Flow
const nodeTypes = {
  customNode: CustomNode,
};

// Builder: Main component for managing chatbot flow state and UI
const Builder: React.FC = () => {
  // State for sidebar visibility
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  // State for nodes and edges in the flow
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  // Drag-and-drop context for adding nodes
  const [node] = useDnD();
  // Node configuration context (selected node, React Flow instance, etc.)
  const { selectedNode, rfInstance, setRfInstance } = useConfigureNode();
  // React Flow hook for coordinate conversion
  const { screenToFlowPosition } = useReactFlow();

  // Handle node changes (move, update, etc.)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  // Handle edge changes (add, remove, update)
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  // Handle connecting nodes with an edge (only one outgoing edge per source handle)
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((edgesSnapshot) => {
        // Only allow one outgoing edge per source handle
        const exists = edgesSnapshot.some(
          (e) => e.source === params.source && e.sourceHandle === params.sourceHandle
        );
        if (exists) return edgesSnapshot;
        return addEdge(params, edgesSnapshot);
      });
    },
    [],
  );

  // Allow drag-over for node drop
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Validate the flow to ensure all nodes are connected
  const validateFlow = useCallback(
    (flow: ReturnType<ReactFlowInstance["toObject"]>) => {
      let error: { error: string; node: Node } | null = null;
      const edgesObj: Record<string, boolean | Node> = {};

      flow.edges.forEach((edge) => {
        edgesObj[edge.source] = true;
        edgesObj[edge.target] = true;
      });

      flow.nodes.forEach((node) => {
        delete node.data.icon;

        if (!error) {
          if (edgesObj[node.id]) {
            delete edgesObj[node.id];
          } else {
            edgesObj[node.id] = node;
          }
        }
      });

      if (!error && Object.keys(edgesObj).length && flow.nodes.length > 1) {
        error = {
          error: "Can't have disconnected nodes",
          node: edgesObj[Object.keys(edgesObj)[0]] as Node,
        };
      }

      return error;
    },
    [],
  );

  // Save the flow to local storage if valid
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const error = validateFlow(flow);

      if (error) {
        toast.error("Please remove the disconnected nodes", {
          position: "bottom-right",
        });
      } else {
        localStorage.setItem(FLOW_SAVE_KEY, JSON.stringify(flow));
        toast.success("Flow saved successfully!", { position: "bottom-right" });
      }
    }
  }, [rfInstance]);

  // Handle dropping a node onto the canvas
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!node) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type: "customNode",
        position,
        data: node,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, node],
  );

  // Restore flow from local storage
  const onRestore = useCallback(
    (flow: any) => {
      if (rfInstance) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        const nodes = flow.nodes || [];

        setNodes(nodes);
        setEdges(flow.edges || []);
        rfInstance.setViewport({ x, y, zoom });
      }
    },
    [rfInstance, setNodes, setEdges],
  );

  // Close sidebar when a node is selected
  useEffect(() => {
    if (selectedNode) setIsSideDrawerOpen(false);
  }, [selectedNode]);

  // Restore flow on mount if saved
  useEffect(() => {
    const savedFlow = localStorage.getItem(FLOW_SAVE_KEY);

    if (savedFlow) {
      onRestore(JSON.parse(savedFlow));
    }
  }, [rfInstance]);

  // Render the flow editor, controls, and sidebars
  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        proOptions={{ hideAttribution: true }}
        onInit={setRfInstance}
        fitView
      >
        <Controls />
        <Background gap={24} size={1} />
        {/* Panel for Add Node and Save Flow buttons */}
        <Panel position="top-right" className="flex gap-4">
          <Button onClick={() => setIsSideDrawerOpen(true)}>
            <div className="flex gap-2">
              <IconPlus /> Add Node
            </div>
          </Button>
          <Button onClick={onSave}>
            <div className="flex gap-2">
              <IconDeviceFloppy /> Save Flow
            </div>
          </Button>
        </Panel>
      </ReactFlow>
      {/* Sidebar for adding nodes */}
      <Sidebar
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
      />
      {/* Sidebar for configuring selected node */}
      <NodeConfigurationSidebar />
    </div>
  );
};

// Wrap Builder with context providers for DnD and node configuration
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <ConfigureNodeProvider>
        <Builder />
      </ConfigureNodeProvider>
    </DnDProvider>
  </ReactFlowProvider>
);
