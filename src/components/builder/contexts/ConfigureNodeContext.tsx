import type { ReactFlowInstance } from "@xyflow/react";
import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

// Context type for node configuration
interface ConfigureNodeContextType {
  selectedNode: any;
  setSelectedNode: Dispatch<SetStateAction<any>>;
  rfInstance: ReactFlowInstance | null;
  setRfInstance: Dispatch<SetStateAction<ReactFlowInstance | null>>;
}

// Context for managing selected node and React Flow instance
const ConfigureNodeContext = createContext<ConfigureNodeContextType>({
  selectedNode: null,
  setSelectedNode: () => {},
  rfInstance: null,
  setRfInstance: () => {},
});

// Provider for ConfigureNodeContext
export const ConfigureNodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  return (
    <ConfigureNodeContext.Provider
      value={{ selectedNode, setSelectedNode, rfInstance, setRfInstance }}
    >
      {children}
    </ConfigureNodeContext.Provider>
  );
};

export default ConfigureNodeContext;

// Hook to access ConfigureNodeContext
export const useConfigureNode = () => {
  return useContext(ConfigureNodeContext);
};
