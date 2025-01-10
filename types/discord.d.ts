import { Collection } from "discord.js"
import { ChatInputCommandInteraction } from "discord.js"

declare module "discord.js" {
  interface Client {
    commands: Collection<
      string,
      { execute(interaction: ChatInputCommandInteraction): Promise<void> }
    >
  }
}
