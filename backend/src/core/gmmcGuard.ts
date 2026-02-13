import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC);

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)"
];

const token = new ethers.Contract(
  process.env.GMMC_TOKEN!,
  ERC20_ABI,
  provider
);

const MIN_HOLD = ethers.parseUnits(
  process.env.MIN_HOLD || "1000000",
  18
);

export async function checkGMMC(wallet: string) {
  const balance = await token.balanceOf(wallet);
  return balance >= MIN_HOLD;
}
