import { APIS } from "@/apis/api.tsx";

export default async function getAISearch(
  searchMsg:string
):Promise<SearchResult>{
  const response = await fetch(`${APIS.summaryAISearch}/${searchMsg}`, {
    method: "get",
    // headers: {
    //   "content-type": "application/json",
    // },
  });

  const response_json: SearchResult = await response.json();
  console.log(response_json);

  if (response_json.code !== 200) {
    throw new Error(response_json.message);
  }
  return response_json;

}