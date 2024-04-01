import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Onboarding from "./routes/onboarding";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Onboarding />
  )

  return (
    <div>
      <div className="text-2xl">
        <nav>ダウンロード</nav>
      </div>
      <div>
        <input />
        <p>WARNING: セキュアなVPNに接続していない場合、IPアドレスを元にダウンロード履歴が追跡される可能性があります。十分に注意してください。</p>
        </div>
    </div>
  );
}

export default App;
