import axios from "axios";

export const name = "web_research";
export async function execute(params: any) {
  const res = await axios.get(`https://api.duckduckgo.com/?q=${params.query}&format=json`);
  return { data: res.data.AbstractText };
}
