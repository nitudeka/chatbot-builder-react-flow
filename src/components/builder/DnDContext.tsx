import { createContext, useContext, useState } from "react";

// Context for managing drag-and-drop node state
const DnDContext = createContext<[any, (node: any) => void]>([
  null,
  (_: any) => {},
]);

// Provider for DnDContext, supplies node and setNode
export const DnDProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [node, setNode] = useState(null);

  return (
    <DnDContext.Provider value={[node, setNode]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

// Hook to access DnDContext
export const useDnD = () => {
  return useContext(DnDContext);
};
