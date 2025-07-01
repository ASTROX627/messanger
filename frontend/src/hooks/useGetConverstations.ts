// Optimze this later
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { httpInterceptedService } from "../core/httpService";
import type { ConversationType } from "../components/sidebar/Converstation";
import { useAppContext } from "../context/appContext";
import usePrevios from "./usePrevious";


export const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const { isAuthenticated, loading: authLoading } = useAppContext();

  const prevAuthState = usePrevios({ isAuthenticated, authLoading });

  const getConversations = useCallback(async () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setConversations([]);
      return;
    }

    setLoading(true);
    try {
      const response = await httpInterceptedService.get("/users");
      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (prevAuthState && (
      prevAuthState.isAuthenticated !== isAuthenticated ||
      prevAuthState.authLoading !== authLoading
    )) {
      getConversations();
    } else if (!prevAuthState) {
      getConversations();
    }
  }, [getConversations, isAuthenticated, authLoading, prevAuthState]);

  return { loading, conversations };
};