import "dotenv/config"
import {
  REST,
  Routes,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js"
import logger from "./utils/logger"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const token = process.env.TOKEN
const clientId = process.env.CLIENT_ID

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []

const commandsBaseFolder = path.join(__dirname, "commands")
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
      commands.push(command.data.toJSON())
    else logger.warn(`Command file ${commandFile} data or execute not found! `)
  }
}

const rest = new REST().setToken(String(token))
;(async () => {
  try {
    logger.info(
      `Started refreshing ${commands.length} application (/) commands.`,
    )
    const data = (await rest.put(
      Routes.applicationCommands(clientId as string),
      {
        body: commands,
      },
    )) as RESTPostAPIChatInputApplicationCommandsJSONBody[]
    logger.info(
      `Successfully reloaded ${data.length} application (/) commands.`,
    )
  } catch (error) {
    logger.error(String(error))
  }
})()
