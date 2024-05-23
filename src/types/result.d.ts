declare interface Result {
  code: number;
  message: string;
  data: object;
}

declare interface NotifyResult {
  code: number;
  message: string;
  data: Notify[];
}

declare interface InterfaceResult {
  code: number;
  message: string;
  data: InteractionType;
}

declare interface LoginResult {
  code: number;
  message: string;
  data: UserType;
}

declare interface DrawNotifyResult {
  code: number;
  message: string;
  data: DrawNotifyType[];
}


declare interface ChatDetailResult {
  code: number;
  message: string;
  data: InteractionType[];
}

declare interface AddNotifyResult {
  code: number;
  message: string;
  data: Notify;
}
