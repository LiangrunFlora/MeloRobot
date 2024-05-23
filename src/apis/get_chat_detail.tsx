import { APIS } from "@/apis/api";

export default async function get_chat_detail(
  id: number,
): Promise<ChatDetailResult> {
  const response = await fetch(`${APIS.chat_add_message}/${id}`, {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });

  const response_json: ChatDetailResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
