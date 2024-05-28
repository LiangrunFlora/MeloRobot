import { APIS } from "@/apis/api";

export default async function get_weather_info(): Promise<WeatehrResult> {
  const response = await fetch(`${APIS.get_weather_info}`, {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });

  const response_json: WeatehrResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
