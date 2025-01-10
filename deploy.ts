import logger from "@/utils/logger"
import chalk from "chalk"
import {
  REST,
  Routes,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.clear()
logger.info("Discord bot command register with TypeScript by Hoshitsuki Naruko")
logger.info("Powered by discord.js")

if (
  !process.env.TOKEN ||
  process.env.TOKEN === "YOUR_TOKEN_HERE" ||
  process.env.TOKEN === "TOKEN_HERE" ||
  !process.env.SECRET ||
  process.env.SECRET === "YOUR_SECRET_HERE" ||
  process.env.SECRET === "SECRET_HERE" ||
  !process.env.CLIENT_ID ||
  process.env.SECRET === "YOUR_CLIENT_ID_HERE" ||
  process.env.SECRET === "CLIENT_ID_HERE"
) {
  logger.error("TOKEN or SECRET not provided")
  process.exit(1)
}

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
const foldersPath = path.join(__dirname, "interactions")
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"))
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = await import(filePath)
    if ("data" in command && "execute" in command)
      commands.push(command.data.toJSON())
    else logger.warn(`Command ${file} is not valid`)
  }
}

const rest = new REST().setToken(process.env.TOKEN)
;(async () => {
  try {
    logger.info(
      `Started refreshing ${commands.length} application (/) commands.`,
    )
    const data = (await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      { body: commands },
    )) as RESTPostAPIChatInputApplicationCommandsJSONBody[]

    logger.info(
      `Successfully reloaded ${data.length} application (/) commands.`,
    )
  } catch (error) {
    logger.error(String(error))
  }
})()

logger.info("Command registed!")
let setTimer = 5
process.stdout.write(
  `\r${chalk.bgBlueBright.black("[INFO]")} ${chalk.blueBright(`Bot will be started in ${setTimer} seconds`)}`,
)
const timer = setInterval(() => {
  setTimer--
  if (setTimer === 1)
    process.stdout.write(
      `\r${chalk.bgBlueBright.black("[INFO]")} ${chalk.blueBright(`Bot will be started in ${setTimer} second`)}`,
    )
  else
    process.stdout.write(
      `\r${chalk.bgBlueBright.black("[INFO]")} ${chalk.blueBright(`Bot will be started in ${setTimer} seconds`)}`,
    )
  if (setTimer === 0) clearInterval(timer)
}, 1000)
