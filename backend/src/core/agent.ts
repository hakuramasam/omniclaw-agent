import { plan } from "./planner";
import { skills } from "../../skills";

export async function runAgent(goal: string, userWallet?: string) {
  let context: any = { goal, history: [], userWallet };

  for (let i = 0; i < 5; i++) {
    const step = await plan(context);
    const skill = skills[step.action];

    if (!skill) break;

    const result = await skill(step.params);
    context.history.push(result);

    if (step.action === "finish") break;
  }

  return context;
}
