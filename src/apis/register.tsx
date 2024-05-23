import { APIS } from "@/apis/api";

interface RegisterProps {
  account: string;
  password: string;
  phone_number: string;
}

export default async function register({
  account,
  password,
  phone_number,
}: RegisterProps): Promise<Result> {
  const json = JSON.stringify({
    account,
    password,
    email: phone_number,
  });
  const response = await fetch(APIS.register, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: json,
  });

  const response_json: Result = await response.json();

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;
}
