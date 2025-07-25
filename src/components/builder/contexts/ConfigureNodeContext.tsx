import { createContext, useContext, useState } from 'react';
 
const ConfigureNodeContext = createContext([null, (_) => {}]);
 
export const ConfigureNodeProvider: React.FC<{ children: React.ReactNode  }> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
 
  return (
    <ConfigureNodeContext.Provider value={{selectedNode, setSelectedNode}}>
      {children}
    </ConfigureNodeContext.Provider>
  );
}
 
export default ConfigureNodeContext;
 
export const useConfigureNode = () => {
  return useContext(ConfigureNodeContext);
}

