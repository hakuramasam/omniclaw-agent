import express from "express";
import jwt from "jsonwebtoken";
import { addTask } from "../core/taskQueue";
import authRoutes from "./auth";

const app = express();
app.use(express.json());

// Auth routes
app.use("/auth", authRoutes);

// JWT middleware
function requireAuth(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

// Protected task endpoint
app.post("/task", requireAuth, async (req: any, res) => {
  const wallet = req.user.wallet;
  const { goal } = req.body;

  const result = await addTask({ goal, wallet });
  res.json(result);
});

app.get("/health", (_, res) => res.send("ok"));

app.listen(process.env.PORT || 3001, () =>
  console.log("OmniClaw API running")
);
