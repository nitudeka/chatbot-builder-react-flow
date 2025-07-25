import type { ReactFlowInstance } from '@xyflow/react';
import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface ConfigureNodeContextType {
  selectedNode: any;
  setSelectedNode: Dispatch<SetStateAction<any>>;
  rfInstance: ReactFlowInstance | null;
  setRfInstance: Dispatch<SetStateAction<ReactFlowInstance | null>>;
}

const ConfigureNodeContext = createContext<ConfigureNodeContextType>({
  selectedNode: null,
  setSelectedNode: () => {},
  rfInstance: null,
  setRfInstance: () => {},
});

export const ConfigureNodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  return (
    <ConfigureNodeContext.Provider value={{ selectedNode, setSelectedNode, rfInstance, setRfInstance }}>
      {children}
    </ConfigureNodeContext.Provider>
  );
};

export default ConfigureNodeContext;

export const useConfigureNode = () => {
  return useContext(ConfigureNodeContext);
}

