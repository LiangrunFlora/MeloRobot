import { APIS } from "@/apis/api";

interface Input {
  uid: number;
  title: string;
}

export default async function add_new_chat({
  uid,
  title,
}: Input): Promise<AddNotifyResult> {
  const json = JSON.stringify({
    uid,
    title,
  });
  const response = await fetch(`${APIS.add_new_chat}/create`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: json,
  });

  const response_json: AddNotifyResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}

export async function add_new_draw_chat({
  uid,
  title,
}: Input): Promise<AddNotifyResult> {
  const json = JSON.stringify({
    uid,
    title,
  });
  const response = await fetch(`${APIS.add_new_draw_chat}/`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: json,
  });

  const response_json: AddNotifyResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
