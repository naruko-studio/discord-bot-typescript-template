// TODO: Copy me to interactions/subfolder/your-command.ts
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("command-name")
    .setDescription("command-description"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("content")
  },
}
