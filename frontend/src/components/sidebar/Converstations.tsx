import type { FC, JSX } from "react"
import Converstation, { type ConversationType } from "./Converstation"
import { useGetConversations } from "../../hooks/useGetConverstations"
import { getRandomEmoji } from "../../utils/emojis"

const Converstations: FC = (): JSX.Element => {
  const { loading, conversations }: { loading: boolean; conversations: ConversationType[] } = useGetConversations();

  return (
    <div className="flex flex-col py-2 overflow-auto">
      {
        conversations.map((conversation, index) => (
          <Converstation 
          key={conversation._id} 
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex = {index === conversations.length - 1}
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