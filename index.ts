import { Client, GatewayIntentBits } from "discord.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import logger from "@/utils/logger"

// 獲取當前檔案的路徑，並取出目錄名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (
  !process.env.TOKEN ||
  process.env.TOKEN === "YOUR_TOKEN_HERE" ||
  process.env.TOKEN === "TOKEN_HERE"
) {
  logger.error("No token provided")
  process.exit(1)
} else {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] })

  // 使用 ES 模組的方式獲取 events 資料夾的路徑
  const eventsPath = path.join(__dirname, "events")
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".ts"))

  // 需要將這部分包裹在 async 函式內
  const loadEvents = async () => {
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file)
      const event = await import(filePath) // 動態引入事件檔案
      if (event.once)
        client.once(event.name, (...args) => event.execute(...args))
      else client.on(event.name, (...args) => event.execute(...args))
    }

    // 在所有事件處理程序加載後登入 Discord
    client.login(process.env.TOKEN)
  }

  loadEvents()
}
