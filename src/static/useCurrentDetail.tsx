import { create } from "zustand";

interface Input {
  currentDetail: number;
  setCurrentDetail: (input: number) => void;
}

const useCurrentDetail = create<Input>((set) => ({
  currentDetail: -1,
  setCurrentDetail: (input) => set(() => ({ currentDetail: input })),
}));

export default useCurrentDetail;
