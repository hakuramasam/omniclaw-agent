export async function runAgent(goal: string, userWallet?: string) {
  try {
    let context: any = { goal, history: [], userWallet };

    for (let i = 0; i < 5; i++) {
      const step = await plan(context);
      if (!step?.action) break;

      const skill = skills[step.action];
      if (!skill) break;

      const result = await skill(step.params || {});
      context.history.push(result);

      if (step.action === "finish") break;
    }

    return context;
  } catch (err) {
    console.error("Agent error:", err);
    return { error: "Agent failed safely" };
  }
}
