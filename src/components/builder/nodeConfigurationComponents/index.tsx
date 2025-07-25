import { useMemo } from 'react';
import { useConfigureNode } from '../contexts/ConfigureNodeContext';
import MessageNode from './Message';

const configurationComponents = [
  { type: 'message', component: MessageNode }
]

const NodeConfiguration: React.FC = () => {
  const { selectedNode } = useConfigureNode()

  const ConfigComponent = useMemo(() => {
    if (!selectedNode) return null;

    const component = configurationComponents.find(c => c.type === selectedNode.type)

    return component?.component
  }, [])

  if (!ConfigComponent) return null

  return (
    <div className="pt-2">
      <ConfigComponent />
    </div>
  )
}

export default NodeConfiguration;
