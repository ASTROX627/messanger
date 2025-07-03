import { memo, useCallback, useMemo, type FC, type ReactNode } from "react";
import useConverstation from "../../store/useConverstaion";
import { useAppContext } from "../../context/appContext";

export type ConversationType = {
  profilePicture: string
  fullName: string
  _id: string
}

type ConverstationProps = {
  emoji: ReactNode
  lastIndex: boolean
  conversation: ConversationType
}

const Conversation: FC<ConverstationProps> = memo(({
  conversation, emoji, lastIndex
}) => {
  const { selectedConversation, setSelectedConversation } = useConverstation();
  const { onlineUser } = useAppContext();
  
  const conversationData = useMemo(() =>{
    const isOnline = onlineUser.includes(conversation._id);
    return{
      isSelected: selectedConversation?._id === conversation._id,
      isOnline
    }
  }, [onlineUser, conversation._id, selectedConversation?._id])

  const handleClick = useCallback(() => {
    setSelectedConversation(conversation);
  }, [setSelectedConversation, conversation]);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer ${conversationData.isSelected ? "bg-sky-500" : ""
          }`}
        onClick={handleClick}
      >
        <div className={`${conversationData.isOnline ? "avatar avatar-online" : "avatar"}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePicture}
              alt="user avatar"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  )
})

Conversation.displayName = 'Conversation'
export default Conversation