// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn create_directory(path: String) -> Result<(), String> {
  std::fs::create_dir_all(path)
    .map_err(|e| e.to_string())
}


fn main() {
    tauri::Builder::default()
        // ↓ここから
        .setup(|app| {
            // 開発時だけdevtoolsを表示する。
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, create_directory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
