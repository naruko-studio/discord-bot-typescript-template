import chalk from "chalk"

const levels = ["debug", "info", "warn", "error"]
const currentLevel = process.env.LOGLEVEL || "INFO"
const currentLevelIndex = levels.indexOf(currentLevel)

class Logger {
  error(context: string) {
    if (currentLevelIndex <= levels.indexOf("error"))
      console.error(
        chalk.bgRedBright.black("[ERROR]"),
        chalk.redBright(context),
      )
  }
  warn(context: string) {
    if (currentLevelIndex <= levels.indexOf("warn"))
      console.warn(
        chalk.bgYellowBright.black("[WARN]"),
        chalk.yellowBright(context),
      )
  }
  info(context: string) {
    if (currentLevelIndex <= levels.indexOf("info"))
      console.log(chalk.bgBlueBright.black("[INFO]"), chalk.blueBright(context))
  }
  debug(context: string) {
    if (currentLevelIndex <= levels.indexOf("debug"))
      console.debug(
        chalk.bgGreenBright.black("[DEBUG]"),
        chalk.greenBright(context),
      )
  }
}

const logger = new Logger()

export default logger
