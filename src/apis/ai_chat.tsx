import { APIS } from "@/apis/api";

interface Input {
  message: string;
  uid: number;
  imageBase64?: string;
}

export default async function get_message_response({
  message,
  uid,
  imageBase64 = "",
}: Input): Promise<InterfaceResult> {
  // 构建请求体
  const payload = {
    message: message,
    image: imageBase64,
    uid: uid,
  };
  const response = await fetch(APIS.chat_add_message, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response_json: InterfaceResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
