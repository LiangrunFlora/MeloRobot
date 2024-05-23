import { create } from "zustand";

interface LoginType {
  login: boolean;
  setLogin: (newLogin: boolean) => void;
}

const useLogin = create<LoginType>((set) => ({
  login: false,
  setLogin: (newLogin) =>
    set(() => ({
      login: newLogin,
    })),
}));

export default useLogin;
