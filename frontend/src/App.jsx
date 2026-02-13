import { useState } from "react";

export default function App() {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");

  const runTask = async () => {
    const res = await fetch(import.meta.env.VITE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal })
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>OmniClaw Agent</h1>
      <input
        value={goal}
        onChange={e => setGoal(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={runTask}>Run</button>
      <pre>{result}</pre>
    </div>
  );
}
