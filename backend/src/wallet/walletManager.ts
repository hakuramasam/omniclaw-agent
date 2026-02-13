import { ethers } from "ethers";

export const baseWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY!,
  new ethers.JsonRpcProvider(process.env.BASE_RPC)
);

export const monadWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY!,
  new ethers.JsonRpcProvider(process.env.MONAD_RPC)
);
