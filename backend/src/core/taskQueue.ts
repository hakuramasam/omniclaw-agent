import PQueue from "p-queue";
import { runAgent } from "./agent";

export const queue = new PQueue({
  concurrency: 2,
  interval: 1000,
  intervalCap: 5
});

export function addTask(task: any) {
  return queue.add(() => runAgent(task.goal, task.wallet));
}
