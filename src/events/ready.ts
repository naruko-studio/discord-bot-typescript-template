import logger from "@/utils/logger"
import { Client, Events } from "discord.js"

const ready = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client<true>) {
    logger.info(`Logged in as bot user: ${client.user.tag}`)
  },
}

export default ready
