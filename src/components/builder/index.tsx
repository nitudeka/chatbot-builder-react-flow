import { useState, useCallback, useEffect } from 'react';
import { v4 } from 'uuid';
import { ReactFlow, Background, Panel, applyNodeChanges, applyEdgeChanges, addEdge, Controls, ReactFlowProvider, useReactFlow, type ReactFlowInstance, type Node, type Edge, type NodeChange, type EdgeChange, type Connection } from '@xyflow/react';
import { toast } from 'react-toastify';
import { IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import CustomNode from './nodes';
import Button from '../button';
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
import { ConfigureNodeProvider, useConfigureNode } from './contexts/ConfigureNodeContext';
import NodeConfigurationSidebar from './NodeConfigurationSidebar';
import '@xyflow/react/dist/style.css';
import { FLOW_SAVE_KEY } from '../../constants';
 
const nodeTypes = {
  customNode: CustomNode
}
 
const Builder: React.FC = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [node] = useDnD();
  const { selectedNode, rfInstance, setRfInstance } = useConfigureNode();
  const { screenToFlowPosition } = useReactFlow();
 
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const error = validateFlow(flow);

      if (error) {
	toast.error("Please remove the disconnected nodes", {
	  position: "bottom-right"
	})
      } else {
	localStorage.setItem(FLOW_SAVE_KEY, JSON.stringify(flow))
	toast.success("Flow saved successfully!", { position: "bottom-right"})
      }
    }
  }, [rfInstance])

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
        type: 'customNode',
        position,
        data: node,
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, node],
  );

  const onRestore = useCallback((flow: any) => {
    if (rfInstance) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      const nodes = flow.nodes || [];

      setNodes(nodes);
      setEdges(flow.edges || []);
      rfInstance.setViewport({ x, y, zoom });
    }
  }, [rfInstance, setNodes, setEdges]);

  useEffect(() => {
    if (selectedNode) setIsSideDrawerOpen(false)
  }, [selectedNode])

  useEffect(() => {
    const savedFlow = localStorage.getItem(FLOW_SAVE_KEY)

    if (savedFlow) {
      onRestore(JSON.parse(savedFlow))
    }
  }, [rfInstance])
 
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
      <Sidebar isOpen={isSideDrawerOpen} onClose={() => setIsSideDrawerOpen(false)} />
      <NodeConfigurationSidebar />
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <ConfigureNodeProvider>
	<Builder />
      </ConfigureNodeProvider>
    </DnDProvider>
  </ReactFlowProvider>
)
