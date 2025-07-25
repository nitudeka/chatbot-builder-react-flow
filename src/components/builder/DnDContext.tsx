import { createContext, useContext, useState } from 'react';
 
const DnDContext = createContext([null, (_) => {}]);
 
export const DnDProvider: React.FC<{ children: React.ReactNode  }> = ({ children }) => {
  const [node, setNode] = useState(null);
 
  return (
    <DnDContext.Provider value={[node, setNode]}>
      {children}
    </DnDContext.Provider>
  );
}
 
export default DnDContext;
 
export const useDnD = () => {
  return useContext(DnDContext);
}
