import express from "express";
import { runAgent } from "../core/agent";

const app = express();
app.use(express.json());

app.post("/task", async (req, res) => {
  const { goal } = req.body;
  const result = await runAgent(goal);
  res.json(result);
});

app.get("/health", (_, res) => res.send("ok"));

app.listen(3001, () => {
  console.log("Agent running on 3001");
});
