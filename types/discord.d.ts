import {
  ChatInputCommandInteraction,
  Collection,
  SlashCommandBuilder,
  type RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js"

export interface SlashCommand {
  data: SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, SlashCommand>
  }
}
