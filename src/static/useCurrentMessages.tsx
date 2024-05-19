import { create } from "zustand";

interface UseCurrentMessagesProps {
  messages: MessageType[];
  setMessages: (input: MessageType[]) => void;
}

const useCurrentMessages = create<UseCurrentMessagesProps>((set) => ({
  messages: [],
  setMessages: (input) => set(() => ({ messages: input })),
}));

export default useCurrentMessages;
