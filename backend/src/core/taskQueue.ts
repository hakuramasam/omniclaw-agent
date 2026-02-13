import Queue from "bullmq";
export const taskQueue = new Queue("tasks", { connection: { host: "127.0.0.1", port: 6379 } });

export async function addTask(task: any) {
  await taskQueue.add("newTask", task);
}

taskQueue.process(async job => {
  const { runAgent } = await import("./agent");
  return await runAgent(job.data.goal, job.data.wallet);
});
