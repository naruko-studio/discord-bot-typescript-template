import logger from "./utils/logger"
import { Client, Collection, GatewayIntentBits } from "discord.js"
import type { SlashCommand } from "./types/discord"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const token = process.env.TOKEN

if (!token) {
  logger.error("TOKEN is not set")
  process.exit(1)
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection<string, SlashCommand>()

const commandsBaseFolder = path.join(__dirname, "interactions")
const commandsFolder = fs.readdirSync(commandsBaseFolder)

for (const folder of commandsFolder) {
  const commandsBasePath = path.join(commandsBaseFolder, folder)
  const commandsFile = fs
    .readdirSync(commandsBasePath)
    .filter((file) => file.endsWith(".ts"))
  for (const file of commandsFile) {
    const commandFile = path.join(commandsBasePath, file)
    const { default: command } = await import(commandFile)
    if ("data" in command && "execute" in command)
      client.commands.set(command.data.name, command)
    else logger.warn(`Command file ${commandFile} data or execute not found! `)
  }
}

const eventsBaseFolder = path.join(__dirname, "events")
const eventsFile = fs
  .readdirSync(eventsBaseFolder)
  .filter((file) => file.endsWith(".ts"))

for (const file of eventsFile) {
  const events = path.join(eventsBaseFolder, file)
  const { default: event } = await import(events)
  if (event.once) client.once(event.name, (...args) => event.execute(...args))
  else client.on(event.name, (...args) => event.execute(...args))
}

client.login(token)
