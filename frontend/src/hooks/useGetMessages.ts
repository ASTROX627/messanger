import { useEffect, useState } from "react"
import useConverstation from "../store/useConverstaion";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { httpInterceptedService } from "../core/httpService";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConverstation();
  
  useEffect(() => {
    const getMessages = async() => {
      setLoading(true);
      try {
        const response = await httpInterceptedService.get(`/messages/${selectedConversation?._id}`);
        const data = await response.data;
        console.log("data is:", data);
        
        if(data.error){
          throw new Error(data.error);
        }
        
        setMessages(data);

      } catch (error) {
        if(error instanceof AxiosError){
          toast.error(error.message)
        }
      } finally{
        setLoading(false)
      }
    }
    
    if(selectedConversation?._id){
      getMessages();
    } 
  }, [selectedConversation?._id, setMessages])

  return {loading, messages}
}