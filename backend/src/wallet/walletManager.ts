import { ethers } from "ethers";

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY missing");
}

export const baseProvider = new ethers.JsonRpcProvider(process.env.BASE_RPC);
export const baseWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  baseProvider
);

// Transaction guard
export async function safeSend(tx: any) {
  const gasLimit = await baseProvider.estimateGas(tx);
  if (gasLimit > 500000) {
    throw new Error("Gas too high");
  }
  return baseWallet.sendTransaction(tx);
}
