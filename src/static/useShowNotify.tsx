import { create } from "zustand";

interface NotifyType {
  showNotify: boolean;
  setShowNotify: (input: boolean) => void;
}

const useShowNotify = create<NotifyType>((set) => ({
  showNotify: false,
  setShowNotify: (input) => set(() => ({ showNotify: input })),
}));

export default useShowNotify;
