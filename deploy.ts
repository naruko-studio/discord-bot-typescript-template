import logger from "@/utils/logger"

if (
  !process.env.TOKEN ||
  process.env.TOKEN === "YOUR_TOKEN_HERE" ||
  process.env.TOKEN === "TOKEN_HERE" ||
  !process.env.SECRET ||
  process.env.SECRET === "YOUR_SECRET_HERE" ||
  process.env.SECRET === "TOKEN_SECRET"
) {
  logger.error("TOKEN or SECRET not provided")
  process.exit(1)
}
