// TODO: Copy me to interactions/subfolder/your-command.ts
import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js"

const commandName = {
  data: new SlashCommandBuilder()
    .setName("command-name")
    .setDescription("command-description"),
  async execute(interaction: ChatInputCommandInteraction) {
    // ? any thing you want to do before reply here
    await interaction.reply("content")
  },
}

export default commandName
