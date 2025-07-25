/*
  * Wrapper for all the node types
*/

import { useMemo } from 'react';
import type { NodeProps } from '@xyflow/react';
import BuilderHandle from '../Handle';
import { useConfigureNode } from '../contexts/ConfigureNodeContext';

const Nodes: React.FC<{ data: any } & NodeProps> = (props) => {
  const { selectedNode, setSelectedNode } = useConfigureNode()

  const onNodeClick = () => {
    setSelectedNode(props.data)
  }

  const isNodeSelected = useMemo(() => {
    return selectedNode?.id === props.data?.id
  }, [selectedNode, props.data?.id])

  return (
    <div onClick={onNodeClick} className="cursor-pointer relative inline-block px-4 py-2 font-medium group">
      <span className={[isNodeSelected ? "-translate-y-0 -translate-x-0" : "translate-x-1 translate-y-1", "absolute inset-0 w-full h-full transition duration-200 ease-out transform bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"].join(" ")}></span>
      <span className={[isNodeSelected ? "bg-black" : "bg-white", "absolute inset-0 w-full h-full border-2 border-black group-hover:bg-black"].join(" ")}></span>
      <div className={[isNodeSelected ? "text-white" : "text-black", "relative group-hover:text-white"].join(" ")}>
      <p className="text-sm">{props.data.label}</p>
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
  )
}

export default Nodes;
