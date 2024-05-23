import { create } from "zustand";

interface Input {
  addNew: boolean;
  setAddNew: (input: boolean) => void;
}

const useAddNew = create<Input>((set) => ({
  addNew: true,
  setAddNew: (input) => set(() => ({ addNew: input })),
}));

export default useAddNew;
