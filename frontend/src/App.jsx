import { useState } from "react";
import { ethers } from "ethers";

export default function App() {
  const [goal, setGoal] = useState("");
  const [token, setToken] = useState("");

  async function login() {
    if (!window.ethereum) return alert("Install wallet");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const wallet = await signer.getAddress();

    // Get nonce
    const nonceRes = await fetch(
      import.meta.env.VITE_API + `/auth/nonce/${wallet}`
    );
    const { nonce } = await nonceRes.json();

    const message = `OmniClaw Login: ${nonce}`;
    const signature = await signer.signMessage(message);

    // Verify
    const verifyRes = await fetch(
      import.meta.env.VITE_API + "/auth/verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, signature })
      }
    );

    const data = await verifyRes.json();
    setToken(data.token);
  }

  async function runTask() {
    const res = await fetch(import.meta.env.VITE_API + "/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ goal })
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>OmniClaw</h1>
      <button onClick={login}>Connect Wallet</button>
      <br /><br />
      <input
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={runTask}>Run</button>
    </div>
  );
}
