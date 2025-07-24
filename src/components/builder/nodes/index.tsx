/*
  * Wrapper for all the node types
*/

import BuilderHandle from '../Handle';

const Nodes: React.FC<{ data: any }> = (props) => {
  return (
    <div className="border">
      <p>{props.data.label}</p>
      <BuilderHandle
	type="target"
	position="top"
	handleId={props.data.handleId}
      />
      <BuilderHandle
	type="source"
	position="bottom"
	handleId={props.data.handleId}
      />
    </div>
  )
}

export default Nodes;
