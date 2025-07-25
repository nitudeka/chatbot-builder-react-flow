// add new node types here
export type NodeTypes = "message";

export type NodeData = {
  label: string;
  type: NodeTypes;
  id: string;
  message: string;
};

