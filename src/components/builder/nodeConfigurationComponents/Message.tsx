import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { useConfigureNode } from "../contexts/ConfigureNodeContext"

const MessageNode: React.FC = () => {
  const { register, setValue } = useFormContext()
  const { selectedNode } = useConfigureNode()

  useEffect(() => {
    setValue('message', selectedNode.message)
  }, [selectedNode])

  return (
    <div>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Enter message</label>
      <textarea id="message" {...register("message")} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"></textarea>
    </div>
  )
}

export default MessageNode;
