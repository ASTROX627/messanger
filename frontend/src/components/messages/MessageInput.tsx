import { Send } from "lucide-react";
import type { FC, JSX } from "react";

const MessageInput: FC = ():JSX.Element => {
  return(
    <form className="px-4 my-3">
      <div className="w-full relative opacity-75">
        <input 
          type="text" 
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"  
        />
        <button type="submit" className="absolute end-0 inset-y-0 flex items-center pe-3">
          <Send className="cursor-pointer"/>
        </button>
      </div>
    </form>
  )
}

export default MessageInput;