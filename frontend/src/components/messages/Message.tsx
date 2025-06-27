import type { FC } from "react";
import { useAuthContext } from "../../context/authContext"
import useConverstation, { type MessageType } from "../../store/useConverstaion";
import { extractTime } from "../../utils/extractTime";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Message: FC<{ message: MessageType }> = ({ message }) => {

  const { user, isAuthenticated, loading } = useAuthContext();
  const { selectedConversation } = useConverstation();
  const fromMe = isAuthenticated && user && message.senderId === user._id;
  const timeFormat = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe ? user?.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  if(loading || !user){
    return <MessageSkeleton/>
  }

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePicture}
            />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{timeFormat}</div>
      </div>
    </>
  )
}

export default Message