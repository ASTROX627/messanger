import type { FC, JSX } from "react"
import Converstation, { type ConversationType } from "./Converstation"
import { useGetConversations } from "../../hooks/useGetConverstations"
import { getRandomEmoji } from "../../utils/emojis"
import { useAppContext } from "../../context/appContext"

const Converstations: FC = (): JSX.Element => {
  const { loading, conversations }: { loading: boolean; conversations: ConversationType[] } = useGetConversations();
  const { loading: authLoading, isAuthenticated } = useAppContext();


  if (authLoading) {
    return (
      <div className="flex flex-col py-2 overflow-auto">
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner mx-auto"></span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col py-2 overflow-auto">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Please login to see conversations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-2 overflow-auto">
      {
        conversations.map((conversation, index) => (
          <Converstation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIndex={index === conversations.length - 1}
          />
        ))
      }
      {
        loading ? <span className="loading loading-spinner mx-auto"></span> : null
      }
    </div>
  )
}

export default Converstations