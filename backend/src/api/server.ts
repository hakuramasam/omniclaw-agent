import express from "express";
import jwt from "jsonwebtoken";
import { addTask } from "../core/taskQueue";
import authRoutes from "./auth";
import { checkGMMC } from "../core/gmmcGuard";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

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

app.post("/task", requireAuth, async (req: any, res) => {
  try {
    const wallet = req.user.wallet;
    const { goal } = req.body;

    // 🔐 GMMC Access Control
    const allowed = await checkGMMC(wallet);
    if (!allowed) {
      return res.status(403).json({
        error: "Insufficient GMMC",
        required: process.env.MIN_HOLD
      });
    }

    const result = await addTask({ goal, wallet });
    res.json(result);

  } catch (e) {
    console.error(e);
    res.status(500).send("Task failed");
  }
});

app.listen(process.env.PORT || 3001, () =>
  console.log("OmniClaw API running")
);
