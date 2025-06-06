import { MessagesSquare } from "lucide-react"
import type { FC, JSX } from "react"


const NoChatSelected: FC = ():JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 username ❄️</p>
        <p>Select a chat to start messaging</p>
        <MessagesSquare className="size-7.5 md:size-15 text-center"/>
      </div>
    </div>
  )
}

export default NoChatSelected