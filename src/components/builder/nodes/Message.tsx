import type { NodeData } from "../types"

const NodeMessage: React.FC<Partial<NodeData>> = (props) => {
  if (!props.message) return null;

  return (
    <div className="border-t max-w-xs mt-1">
      <span className="text-xs text-gray-500">
	{ props.message }
      </span>
    </div>
  )
}

export default NodeMessage
