import { APIS } from "@/apis/api";

export default async function get_notify(id: number): Promise<NotifyResult> {
  const response = await fetch(`${APIS.get_notify}/${id}`, {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });

  const response_json: NotifyResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
