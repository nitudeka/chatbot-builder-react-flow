import type { ReactFlowInstance } from '@xyflow/react';
import { createContext, useContext, useState } from 'react';
 
const ConfigureNodeContext = createContext([null, (_) => {}]);
 
export const ConfigureNodeProvider: React.FC<{ children: React.ReactNode  }> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
 
  return (
    <ConfigureNodeContext.Provider value={{selectedNode, setSelectedNode, rfInstance, setRfInstance}}>
      {children}
    </ConfigureNodeContext.Provider>
  );
}
 
export default ConfigureNodeContext;
 
export const useConfigureNode = () => {
  return useContext(ConfigureNodeContext);
}

