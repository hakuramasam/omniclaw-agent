export const name = "post_moltbook";
export async function execute(params: any) {
  await fetch("https://api.moltbook.com/post", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.MOLTBOOK_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  return { done: true };
}
