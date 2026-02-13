import express from "express";
import { addTask } from "../core/taskQueue";

const app = express();
app.use(express.json({ limit: "1mb" }));

// Basic API key protection
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (process.env.API_KEY && key !== process.env.API_KEY) {
    return res.status(401).send("Unauthorized");
  }
  next();
});

app.post("/task", async (req, res) => {
  try {
    const { goal, wallet } = req.body;
    const result = await addTask({ goal, wallet });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Task failed");
  }
});

app.get("/health", (_, res) => res.send("ok"));

app.listen(process.env.PORT || 3001, () =>
  console.log("OmniClaw API running")
);
