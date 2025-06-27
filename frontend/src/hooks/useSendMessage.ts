import { useState } from "react"
import useConverstation from "../store/useConverstaion";
import toast from "react-hot-toast";
import { httpInterceptedService} from "../core/httpService";
import { AxiosError } from "axios";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation}= useConverstation();
  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const response = await httpInterceptedService.post(`/messages/send/${selectedConversation?._id}`,{
        message
      });
      const data = response.data;
      
      if(data.error){
        throw new Error(data.error)
      }
      setMessages([...messages, data])
    } catch (error) {
      if(error instanceof AxiosError){
        toast.error(error.message)
      }
    } finally{
      setLoading(false)
    }
  }

  return {sendMessage, loading}
}