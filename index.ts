import logger from "@/utils/logger"
import { Client, GatewayIntentBits } from "discord.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

console.clear()

logger.info("Discord bot with TypeScript by Hoshitsuki Naruko")
logger.info("Powered by discord.js")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (
  !process.env.TOKEN ||
  process.env.TOKEN === "YOUR_TOKEN_HERE" ||
  process.env.TOKEN === "TOKEN_HERE"
) {
  logger.error("No token provided")
  process.exit(1)
}
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const eventsPath = path.join(__dirname, "events")
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".ts"))

const loadEvents = async () => {
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = await import(filePath)
    if (event.once) client.once(event.name, (...args) => event.execute(...args))
    else client.on(event.name, (...args) => event.execute(...args))
  }
}

loadEvents()

client.login(process.env.TOKEN)
