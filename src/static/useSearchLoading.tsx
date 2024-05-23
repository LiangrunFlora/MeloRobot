import { create } from "zustand";

interface Input {
  loading: boolean;
  setLoading: (input: boolean) => void;
}

const useSearchLoading = create<Input>((set) => ({
  loading: false,
  setLoading: (input) =>
    set(() => ({
      loading: input,
    })),
}));

export default useSearchLoading;
