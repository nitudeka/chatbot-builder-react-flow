import { Handle, Position } from "@xyflow/react";
import { v4 } from "uuid";

interface IHandleProps {
  type: 'target' | 'source';
  position: keyof typeof positions;
  handleId?: string;
  isConnectable?: boolean;
}

const positions = {
  top: Position.Top,
  bottom: Position.Bottom,
};

const BuilderHandle: React.FC<IHandleProps> = (props) => {
  const bgClr = props.type === "target" ? "rgb(3 7 18)" : "rgb(107 114 128)";

  return (
    <Handle
      style={{
        marginTop: "-8px",
        marginBottom: "-8px",
        padding: "5px",
        backgroundColor: bgClr,
      }}
      id={props.handleId || v4()}
      type={props.type}
      position={positions[props.position]}
      isConnectable={props.isConnectable}
    />
  );
};

export default BuilderHandle;

