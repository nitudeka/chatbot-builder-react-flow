import { useForm, FormProvider } from "react-hook-form";
import { useConfigureNode } from "./contexts/ConfigureNodeContext";
import SideDrawer from "../sideDrawer";
import NodeConfiguration from "./nodeConfigurationComponents";

const NodeConfigurationSidebar: React.FC = () => {
  const { selectedNode, setSelectedNode, rfInstance } = useConfigureNode();
  const methods = useForm();

  const updateNode = (data: any) => {
    const nodes = rfInstance?.getNodes() || [];
    const nodeIndx = nodes.findIndex(
      (node: any) => node.data.id === selectedNode.id,
    );

    if (nodeIndx > -1) {
      nodes[nodeIndx].data = { ...nodes[nodeIndx].data, ...data };
      rfInstance?.setNodes(nodes);
    }

    setSelectedNode(null);
  };

  const onSave = (data: any) => {
    updateNode({ ...data });
  };

  return (
    <SideDrawer
      title="Configure Node"
      isOpen={!!selectedNode}
      onClose={() => setSelectedNode(null)}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSave)}>
          <NodeConfiguration />
          <button className="absolute group bottom-14 right-0 left-0 p-2 border-t">
            <div className="w-full cursor-pointer relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full border-2 border-blue-600 bg-blue-500 group-hover:bg-blue-600"></span>
              <p className="relative text-center text-white">Save</p>
            </div>
          </button>
        </form>
      </FormProvider>
    </SideDrawer>
  );
};

export default NodeConfigurationSidebar;
