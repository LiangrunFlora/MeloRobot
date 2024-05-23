import { create } from "zustand";

interface UseUserInfoProps {
  userInfo: UserType;
  setUserInfo: (input: UserType) => void;
}

const useUserInfo = create<UseUserInfoProps>((set) => ({
  userInfo: {
    id: 1,
    account: "",
    username: "",
    email: "",
    head_image: "",
  },
  setUserInfo: (input) => set(() => ({ userInfo: input })),
}));

export default useUserInfo;
