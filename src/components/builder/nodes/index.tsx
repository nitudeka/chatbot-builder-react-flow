/*
  * Wrapper for all the node types
*/

import BuilderHandle from '../Handle';

const Nodes: React.FC<{ data: any }> = (props) => {
  return (
    <div className="cursor-pointer relative inline-block px-4 py-2 font-medium group">
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
      <div className="relative text-black group-hover:text-white">
      <p className="text-sm">{props.data.label}</p>
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
    </div>
  )
}

export default Nodes;
