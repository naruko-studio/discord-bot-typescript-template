import { Client, Events } from "discord.js"

const ready = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client): void {
    console.log(`System ready. Logged in as ${client?.user?.tag}`)
  },
}

export default ready
