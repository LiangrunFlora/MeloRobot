import { create } from "zustand";

interface Input {
  currentModel: number;
  setCurrentModel: (input: number) => void;
}

const useCurrentModel = create<Input>((set) => ({
  currentModel: 1,
  setCurrentModel: (input) => set(() => ({ currentModel: input })),
}));

export default useCurrentModel;
