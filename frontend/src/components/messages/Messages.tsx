import { useEffect, useRef, type FC, type JSX } from 'react'
import Message from './Message'
import { useGetMessages } from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';

const Messages: FC = (): JSX.Element => {

  const { messages, loading} = useGetMessages();
  const lastMessage = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if(lastMessage.current){
      lastMessage.current?.scrollIntoView({behavior: "smooth"})
    }
  },[messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && (
        messages.map((message, index) => (
          <div 
            key={message._id}
            ref={index === messages.length - 1 ? lastMessage: null}  
          >
            <Message message={message} />
          </div>
        ))
      )}
      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages