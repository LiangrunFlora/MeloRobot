import { APIS } from "@/apis/api";

interface Input {
  message: string;
  uid: number;
  detail_id: number;
  imageBase64?: string;
  language?: string;
}

export default async function get_message_response({
  message,
  uid,
  detail_id,
  onMessageReceived,
  setWait,
  signal,
  imageBase64 = "",
  language = "简体中文",
}: Input & {
  onMessageReceived: (chunk: string) => void;
} & {
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  signal: AbortSignal;
}): Promise<InterfaceResult> {
  // 构建请求体
  const payload = {
    message: message,
    image: imageBase64,
    detail_id: detail_id,
    uid: uid,
    language: language,
  };

  const response = await fetch(APIS.chat_add_message, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: signal,
  });

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let collectedResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      setWait(false);
      break;
    }
    const chunk = decoder.decode(value, { stream: true });
    collectedResponse += chunk;
    // 处理每个流式响应块
    onMessageReceived(collectedResponse);
    console.log("Received chunk:", chunk);
  }

  const response_json: InterfaceResult = JSON.parse(collectedResponse);

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }

  return response_json;
}

interface DrawAIInput {
  uid: number;
  text: string;
  dialog_id: number;
}

export async function get_DrawAI_response({
  uid,
  text,
  dialog_id,
}: DrawAIInput): Promise<InterfaceResult> {
  const payload = JSON.stringify({
    uid,
    text,
    dialog_id,
  });

  const response = await fetch(APIS.draw_add_message, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });

  const response_json: InterfaceResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }

  return response_json;
}
