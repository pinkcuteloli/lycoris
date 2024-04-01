import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
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
    return (
      <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">ロックされています</h2>
            <form>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </form>
          </div>
        </div>

        <div>Path: {path}</div>
      </div>
    );
  }
  return <Onboarding />;
}

export default App;
