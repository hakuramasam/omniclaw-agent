import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

export async function runAgent(goal: string) {
  const completion = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "You are an autonomous Web3 AI agent." },
      { role: "user", content: goal }
    ]
  });

  return completion.choices[0].message.content;
}
