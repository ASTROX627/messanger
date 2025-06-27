import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { httpInterceptedService } from "../core/httpService";
import type { ConversationType } from "../components/sidebar/Converstation";


export const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await httpInterceptedService.get("/users");
        const data = await response.data;
        console.log("data:", data);
        if (data.error) {
          throw new Error(data.error)
        }
        setConversations(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    getConversations()

  }, [])

  return { loading, conversations }
}