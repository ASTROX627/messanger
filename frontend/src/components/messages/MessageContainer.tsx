import type { FC, JSX } from "react"
import Messages from "./Messages"
import MessageInput from "./MessageInput"
import NoChatSelected from "./NoChatSelected";

const MessageContainer: FC = (): JSX.Element => {
  const noChatSelected = true;
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ?
        <NoChatSelected /> :
        (
          <>
            <div className="bg-slate-500 px-4 py-2 mb-2">
              <span>To:</span>{" "}
              <span className="text-gray-900 font-bold">John Doe</span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )
      }
    </div>
  )
}

export default MessageContainer