import { create } from "zustand";

interface NotifyShowType {
  id: number;
  title: string;
  uid: number;
}

interface UseCurrentMessagesProps {
  notifyList: NotifyShowType[];
  setNotifyList: (input: NotifyShowType[]) => void;
}

const useNotifyList = create<UseCurrentMessagesProps>((set) => ({
  notifyList: [],
  setNotifyList: (input) => set(() => ({ notifyList: input })),
}));

export default useNotifyList;
