import { create } from "zustand";

interface RegisterType {
  register: boolean;
  setRegister: (newRegister: boolean) => void;
}

const useRegister = create<RegisterType>((set) => ({
  register: false,
  setRegister: (newRegister) =>
    set(() => ({
      register: newRegister,
    })),
}));

export default useRegister;
