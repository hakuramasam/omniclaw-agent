import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function plan(context: any) {
  const res = await client.responses.create({
    model: "gpt-4.1",
    input: `
Goal: ${context.goal}
History: ${JSON.stringify(context.history)}

Choose action:
web_research
write_code
post_moltbook
post_openclaw
finish

Return JSON {action, params}
`
  });

  return JSON.parse(res.output_text);
}
