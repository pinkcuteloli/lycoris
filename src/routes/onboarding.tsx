import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dialog } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { Store } from "tauri-plugin-store-api";

const store = new Store(".settings.json");

export default function Onboarding() {
  const [dir, setDir] = useState<string>("");

  listen("tauri://file-drop", (event) => {
    console.info(event);
  });

  const selectAndCreateFolder = async () => {
    try {
      const selectedPath = await dialog.save({
        title: "フォルダ名を入力して保存先を選択",
        defaultPath: `~/Documents/${dir}`,
      });

      if (selectedPath) {
        await invoke("create_directory", { path: selectedPath });

        await store.set("path", selectedPath);
        await store.save();
      }
    } catch (error) {
      console.error("フォルダ選択エラー:", error);
    }
  };
  return (
    <main className="max-w-6xl py-40 px-4 mx-auto">
      <h2 className="text-4xl mb-5 font-bold">ライブラリを作成</h2>
      <div className="grid grid-cols-2">
        <div>
          <p className="mb-5">Pixiv、ASMR、Torrentなど、お気に入りの作品を安全なローカル環境に構築しましょう</p>
          <Dialog>
            <DialogTrigger asChild={true}>
              <Button>ライブラリを作成</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ライブラリを作成</DialogTitle>
                <DialogDescription>ライブラリを作成して、書類を保管するフォルダを選択しましょう</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="name">ライブラリ名</Label>
                <Input value={dir} onChange={(e) => setDir(e.target.value)} id="name" placeholder="保管庫の名前" className="col-span-3" />
              </div>
              <DialogFooter>
                <Button onClick={selectAndCreateFolder} type="submit">
                  作成する
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
