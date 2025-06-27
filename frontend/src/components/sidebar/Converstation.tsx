import type { FC, JSX, ReactNode } from "react";
import useConverstation from "../../store/useConverstaion";

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

const Converstation: FC<ConverstationProps> = ({conversation, emoji, lastIndex}):JSX.Element => {
  const{selectedConversation, setSelectedConversation} = useConverstation();
  const isSelected = selectedConversation?._id === conversation._id;
  
  return(
    <>
      <div 
        className={`flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500": ""}`}
        onClick={() =>setSelectedConversation(conversation)}  
      >
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePicture} alt="user image" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span>{emoji}</span>
          </div>
        </div>
      </div>
      {
        !lastIndex && <div className="divider my-0 py-0 h-1"/>
      }
    </>
  )
}

export default Converstation;