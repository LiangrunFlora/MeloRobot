import { create } from "zustand";

interface Input {
  selectFile: string;
  setSelectFile: (input: string) => void;
}

const useSelectFile = create<Input>((set) => ({
  selectFile: "",
  setSelectFile: (input) =>
    set(() => ({
      selectFile: input,
    })),
}));

export default useSelectFile;
