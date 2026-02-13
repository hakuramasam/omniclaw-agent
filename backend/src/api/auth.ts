import express from "express";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";

const router = express.Router();

const nonces: Record<string, string> = {};

// Step 1: Get nonce
router.get("/nonce/:wallet", (req, res) => {
  const wallet = req.params.wallet.toLowerCase();
  const nonce = Math.floor(Math.random() * 1e6).toString();
  nonces[wallet] = nonce;
  res.json({ nonce });
});

// Step 2: Verify signature
router.post("/verify", express.json(), async (req, res) => {
  const { wallet, signature } = req.body;

  const nonce = nonces[wallet.toLowerCase()];
  if (!nonce) return res.status(400).send("Nonce not found");

  const message = `OmniClaw Login: ${nonce}`;

  try {
    const recovered = ethers.verifyMessage(message, signature);

    if (recovered.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).send("Invalid signature");
    }

    delete nonces[wallet.toLowerCase()];

    const token = jwt.sign(
      { wallet },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch {
    res.status(400).send("Verification failed");
  }
});

export default router;
