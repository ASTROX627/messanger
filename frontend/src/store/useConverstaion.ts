import {create} from "zustand";
import type { ConversationType } from "../components/sidebar/Converstation";

export type MessageType = {
  _id: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
}

interface ConversationStore {
  selectedConversation: ConversationType | null;
  setSelectedConversation: (selectedConversation: ConversationType | null) => void;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void
}


const useConverstation = create<ConversationStore>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
  messages: [],
  setMessages: (messages) => set({messages})
}))

export default useConverstation;