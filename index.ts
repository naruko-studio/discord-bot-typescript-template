import { Client, GatewayIntentBits } from "discord.js"
import path from "path"
import fs from "fs"
import logger from "@/utils/logger"

if (
  !process.env.TOKEN ||
  process.env.TOKEN === "YOUR_TOKEN_HERE" ||
  process.env.TOKEN === "TOKEN_HERE"
) {
  logger.error("No token provided")
  process.exit(1)
} else {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] })

  const eventsPath = path.join(__dirname, "events")
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".ts"))

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = await import(filePath)
    if (event.once) client.once(event.name, (...args) => event.execute(...args))
    else client.on(event.name, (...args) => event.execute(...args))
  }

  client.login(process.env.TOKEN)
}
