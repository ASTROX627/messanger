import { Send } from "lucide-react";
import { useState, type FC, type FormEvent, type JSX } from "react";
import { useSendMessage } from "../../hooks/useSendMessage";

const MessageInput: FC = (): JSX.Element => {

  const { loading, sendMessage } = useSendMessage();

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message) {
      return
    }
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative opacity-75">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute end-0 inset-y-0 flex items-center pe-3">
          {
            loading ? <div className=" loading loading-spinner"></div> : <Send className="cursor-pointer" />
          }
        </button>
      </div>
    </form>
  )
}

export default MessageInput;