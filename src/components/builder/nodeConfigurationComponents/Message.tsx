import { useFormContext } from "react-hook-form"

const MessageNode: React.FC = () => {
  const { register } = useFormContext()

  return (
    <div>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Enter message</label>
      <textarea id="message" {...register("message")} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"></textarea>
    </div>
  )
}

export default MessageNode;
