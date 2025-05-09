/* eslint-disable */
import {
  Client,
  Collection,
  GatewayIntentBits,
  type ClientEvents,
} from "discord.js"
import { commandRegistry, eventRegistry } from "@/.generated/registry"
import { SlashCommandBuilder } from "discord.js"
import type { SlashCommand } from "@/types/discord"
import logger from "@/utils/logger"
import { ENV } from "@/constants/env"

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection<string, SlashCommand>()

Object.entries(commandRegistry).forEach(([name, command]) => {
  const cmd =
    command.data instanceof SlashCommandBuilder
      ? command
      : {
          ...command,
          data: new SlashCommandBuilder()
            .setName(command.data.name)
            .setDescription(command.data.description),
        }
  client.commands.set(name, cmd)
})

eventRegistry.forEach((event) => {
  if ("once" in event) {
    if (event.once) {
      client.once(event.name as keyof ClientEvents, (...args: unknown[]) => {
        event.execute(...args)
      })
    } else {
      client.on(event.name as keyof ClientEvents, (...args: unknown[]) => {
        event.execute(...args)
      })
    }
  } else {
    client.on(event.name as keyof ClientEvents, (...args: unknown[]) => {
      event.execute(...args)
    })
  }
})

const token = ENV.TOKEN

const shutdown = async () => {
  logger.info("Shutting down the bot...")

  await new Promise<void>((resolve) => {
    client
      .destroy()
      .then(() => {
        logger.info("Bot has shut down successfully.")
        resolve()
      })
      .catch((err) => {
        logger.error(`Error shutting down bot: ${err.message}`)
        resolve()
      })
  })
}

process.on("SIGINT", async () => {
  await shutdown()
  process.exit(0)
})

client
  .login(token)
  .then(() => logger.info("Bot logged in successfully!"))
  .catch((err) => logger.error(`Login failed: ${err.message}`))
/* eslint-enabled */