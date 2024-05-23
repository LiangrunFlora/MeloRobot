import { APIS } from "@/apis/api";

interface LoginProps {
  account: string;
  password: string;
}

export default async function login({
  account,
  password,
}: LoginProps): Promise<LoginResult> {
  const json = JSON.stringify({
    account,
    password,
  });
  const response = await fetch(APIS.login, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: json,
  });

  const response_json: LoginResult = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
