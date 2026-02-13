export const name = "post_openclaw";
export async function execute(params: any) {
  await fetch("https://api.openclaw.ai/post", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENCLAW_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  return { done: true };
}
