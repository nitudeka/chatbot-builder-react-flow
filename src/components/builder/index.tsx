import { useState, useCallback } from 'react';
import { ReactFlow, Background, Panel, applyNodeChanges, applyEdgeChanges, addEdge, Controls, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './nodes';
import AddNodeButton from './AddNodeButton';
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
import { v4 } from 'uuid';
 
const initialNodes = [
  { id: 'n1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const nodeTypes = {
  customNode: CustomNode
}
 
const Builder: React.FC = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [type] = useDnD();
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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
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
        data: { type, label: `${type} node` },
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 
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
        fitView
      >
	<Controls />
        <Background gap={24} size={1} />
	<Panel position="top-right">
	  <AddNodeButton onClick={() => setIsSideDrawerOpen(true)}>
	    Add Node
	  </AddNodeButton>
	</Panel>
      </ReactFlow>
      <Sidebar isOpen={isSideDrawerOpen} onClose={() => setIsSideDrawerOpen(false)} />
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <Builder />
    </DnDProvider>
  </ReactFlowProvider>
)
