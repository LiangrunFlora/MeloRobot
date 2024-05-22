import { create } from "zustand";

interface UseSummaryMsgProps {
  summaryMsg: SearchType;
  setSummaryMessages: (input: SearchType) => void;
}
const useSummaryMessages = create<UseSummaryMsgProps>((set) => ({
  summaryMsg: {
    id:"",
    object:"",
    created:-1,
    result:"",
    is_truncated:false,
    need_clear_history:false,
    finish_reason:"",
    usage:{
      prompt_tokens: -1,
      completion_tokens: -1,
      total_tokens: -1,
    }
  },
  setSummaryMessages: (input) => set(() => ({ summaryMsg: input })),
}));

export default useSummaryMessages;