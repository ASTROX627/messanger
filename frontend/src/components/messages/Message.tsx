import { memo, useMemo, type FC } from "react";
import type { MessageType } from "../../store/useConverstaion";
import { extractTime } from "../../utils/extractTime";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useAppContext } from "../../context/appContext";
import useConverstation from "../../store/useConverstaion";

const Message: FC<{ message: MessageType }> = memo(({ message }) => {
  const { user, isAuthenticated, loading } = useAppContext();
  const { selectedConversation } = useConverstation();
  
  const messageData = useMemo(() => {
    if (!isAuthenticated || !user) return null;
    
    const fromMe = message.senderId === user._id;
    const timeFormat = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePicture = fromMe ? user?.profilePicture : selectedConversation?.profilePicture;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    
    return { fromMe, timeFormat, chatClassName, profilePicture, bubbleBgColor };
  }, [message.senderId, message.createdAt, user, selectedConversation, isAuthenticated]);

  if (loading || !user || !messageData) {
    return <MessageSkeleton />
  }

  return (
    <div className={`chat ${messageData.chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={messageData.profilePicture}
            loading="lazy"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${messageData.bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {messageData.timeFormat}
      </div>
    </div>
  )
})

Message.displayName = 'Message'
export default Message