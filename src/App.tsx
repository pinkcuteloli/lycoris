import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";
import Onboarding from "./routes/onboarding";

const store = new Store(".settings.json");

function App() {
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    (async () => {
      const path = await store.get("path");
      setPath(path as string);
    })();
  });

  if (path) {
    return <div>Path: {path}</div>;
  }
  return <Onboarding />;
}

export default App;
