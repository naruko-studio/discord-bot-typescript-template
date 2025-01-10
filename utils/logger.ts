import chalk from "chalk"
import fs from "fs"
import path from "path"

const levels = ["DEBUG", "INFO", "WARN", "ERROR"]
const currentLevel = process.env.LOGLEVEL || "INFO"
const currentLevelIndex = levels.indexOf(currentLevel)

const logDir = path.join(__dirname, "../log")
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
    if (currentLevelIndex <= levels.indexOf("INFO")) {
      console.log(chalk.bgBlueBright.black("[INFO]"), chalk.blueBright(context))
      writeLog("INFO", context)
    }
  },
  warn: (context: string) => {
    if (currentLevelIndex <= levels.indexOf("WARN")) {
      console.warn(
        chalk.bgYellowBright.black("[WARN]"),
        chalk.yellowBright(context),
      )
      writeLog("WARN", context)
    }
  },
  error: (context: string) => {
    if (currentLevelIndex <= levels.indexOf("ERROR")) {
      console.error(
        chalk.bgRedBright.black("[ERROR]"),
        chalk.redBright(context),
      )
      writeLog("ERROR", context)
    }
  },
  debug: (context: string) => {
    if (currentLevelIndex <= levels.indexOf("DEBUG")) {
      console.debug(
        chalk.bgGreenBright.black("[DEBUG]"),
        chalk.greenBright(context),
      )
      writeLog("DEBUG", context)
    }
  },
}

export default logger
