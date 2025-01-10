import logger from "@/utils/logger"
import { Client, Collection, GatewayIntentBits } from "discord.js"
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

client.commands = new Collection()

const commandFolderPath = path.join(__dirname, "interactions")
const commandFolders = fs.readdirSync(commandFolderPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(commandFolderPath, folder)
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"))
  for (const file of commandFiles) {
    const command = await import(path.join(commandsPath, file))
    if ("data" in command && "execute" in command)
      client.commands.set(command.data.name, command)
    else logger.warn(`Command ${file} is missing data or execute function`)
  }
}

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
