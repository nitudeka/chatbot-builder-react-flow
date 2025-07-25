import { useState, useCallback, useEffect } from 'react';
import { v4 } from 'uuid';
import { ReactFlow, Background, Panel, applyNodeChanges, applyEdgeChanges, addEdge, Controls, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import CustomNode from './nodes';
import Button from '../button';
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
import { ConfigureNodeProvider, useConfigureNode } from './contexts/ConfigureNodeContext';
import NodeConfigurationSidebar from './NodeConfigurationSidebar';
import '@xyflow/react/dist/style.css';
 
const nodeTypes = {
  customNode: CustomNode
}
 
const Builder: React.FC = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [node] = useDnD();
  const { selectedNode, setRfInstance } = useConfigureNode();
  const { screenToFlowPosition } = useReactFlow();
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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

  useEffect(() => {
    if (selectedNode) setIsSideDrawerOpen(false)
  }, [selectedNode])
 
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
	  <Button onClick={() => setIsSideDrawerOpen(true)}>
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
