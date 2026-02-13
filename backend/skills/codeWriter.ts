import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const name = "write_code";
export async function execute(params: any) {
  const res = await client.responses.create({
    model: "gpt-4.1",
    input: `Write production code for: ${params.task}`
  });
  return { code: res.output_text };
}
