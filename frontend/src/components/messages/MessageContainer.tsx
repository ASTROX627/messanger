import { useEffect, type FC, type JSX } from "react"
import Messages from "./Messages"
import MessageInput from "./MessageInput"
import NoChatSelected from "./NoChatSelected";
import useConverstation from "../../store/useConverstaion";

const MessageContainer: FC = (): JSX.Element => {
  const {selectedConversation, setSelectedConversation} = useConverstation();

  useEffect(() => {
    return() => setSelectedConversation(null);
  }, [setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ?
        <NoChatSelected /> :
        (
          <>
            <div className="bg-slate-500 px-4 py-2 mb-2">
              <span>To:</span>{" "}
              <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
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