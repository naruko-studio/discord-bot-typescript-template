import {
  Events,
  type Interaction,
  ChatInputCommandInteraction,
} from "discord.js"
import logger from "@/utils/logger"

const interactionHandler = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      logger.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction as ChatInputCommandInteraction)
    } catch (error) {
      logger.error(String(error))

      const errorMessage = {
        content: "There was an error while executing this command!",
        ephemeral: true,
      }

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage)
      } else {
        await interaction.reply(errorMessage)
      }
    }
  },
}

export default interactionHandler
