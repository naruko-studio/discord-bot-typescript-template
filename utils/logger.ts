import chalk from "chalk"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const levels = ["debug", "info", "warn", "error"]
const currentLevel = process.env.LOGLEVEL || "INFO"
const currentLevelIndex = levels.indexOf(currentLevel)

const logDir = path.join(__dirname, "../logs")
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)

const logFile = path.join(
  logDir,
  `${new Date().toISOString().replace(/[:.]/g, "-")}.log`,
)

const writeLog = (level: string, context: string) => {
  const logMessage = `[${level}] ${context}\n`
  fs.appendFileSync(logFile, logMessage)
}

const logger = {
  info: (context: string) => {
    if (currentLevelIndex <= levels.indexOf("info")) {
      console.log(chalk.bgBlueBright.black("[INFO]"), chalk.blueBright(context))
      writeLog("INFO", context)
    }
  },
  warn: (context: string) => {
    if (currentLevelIndex <= levels.indexOf("warn")) {
      console.warn(
        chalk.bgYellowBright.black("[WARN]"),
        chalk.yellowBright(context),
      )
      writeLog("WARN", context)
    }
  },
  error: (context: string) => {
    if (currentLevelIndex <= levels.indexOf("error")) {
      console.error(
        chalk.bgRedBright.black("[ERROR]"),
        chalk.redBright(context),
      )
      writeLog("ERROR", context)
    }
  },
  debug: (context: string) => {
    if (currentLevelIndex <= levels.indexOf("debug")) {
      console.debug(
        chalk.bgGreenBright.black("[DEBUG]"),
        chalk.greenBright(context),
      )
      writeLog("DEBUG", context)
    }
  },
}

export default logger
