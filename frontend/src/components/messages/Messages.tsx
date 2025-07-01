import { useEffect, useRef, type CSSProperties, type FC} from 'react'
import Message from './Message'
import { useGetMessages } from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import {FixedSizeList as List} from "react-window";

const Messages: FC = () => {

  const { messages, loading} = useGetMessages();
  const listRef = useRef<List>(null);
  const lastMessage = useRef<HTMLDivElement>(null)



  useEffect(() => {
    if(messages.length > 0 && listRef.current){
      listRef.current.scrollToItem(messages.length - 1);
    }
  },[messages])

  useEffect(() => {
    if(lastMessage.current){
      lastMessage.current.scrollIntoView({behavior: "smooth"})
    }
  })

  const Row = ({index, style}: {index: number; style: CSSProperties}) => {
    return(
    <div style={style}>
      <Message message={messages[index]}/>
    </div>

    )
  }

  if(messages.length > 100){
    return(
      <div className='px-4 flex-1'>
        <List
          ref={listRef}
          height={400}
          itemCount={messages.length}
          itemSize={80}
          overscanCount={5}
          width={''}
        >
          {Row}
        </List>
      </div>
    )
  }

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