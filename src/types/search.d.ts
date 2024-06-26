declare interface SearchType {
  id:string;
  object:string;
  created:number;
  result:string;
  is_truncated:boolean;
  need_clear_history:boolean;
  finish_reason:string;
  usage:{
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}