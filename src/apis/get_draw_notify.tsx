import { APIS } from "@/apis/api";

export default async function get_draw_notify(
  id: number,
): Promise<DrawNotifyResult> {
  const response = await fetch(`${APIS.get_draw_notify}/${id}`, {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });

  const response_json: DrawNotifyResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
