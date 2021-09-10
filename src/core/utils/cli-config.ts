import * as path from "path";
import fs, { promises as fsPromises } from "fs";
import { logger } from "./logger";
import { defaultStartContext } from "../../cli";
const { readFile } = fsPromises;

export const swaCliConfigFilename = "swa-cli.config.json";

async function findSwaCliConfig(folder: string) {
  const swaCliConfigPath = path.join(folder, swaCliConfigFilename);

  if (fs.existsSync(swaCliConfigPath)) {
    return swaCliConfigPath;
  }
  return undefined;
}

async function parseSwaCliConfig(file: string) {
  if (!fs.existsSync(file)) {
    logger.error(`Error: swa-cli.config.json file at "${path.relative(".", file)}" not found.`);
    process.exit(1);
  }
  try {
    return JSON.parse((await readFile(file)).toString("utf-8")) as SWACLIConfigFile;
  } catch (e) {
    logger.error(``);
    return {};
  }
}

function printConfigMsg(name: string, file: string) {
  logger.log(`Using configuration "${name}" from file:`, "swa");
  logger.log(`\t${path.resolve(process.cwd(), file)}`, "swa");
  logger.log("", "swa");
  logger.log(`Options passed in via CLI will be overridden by options in file.`, "swa");
}

export async function getFileOptions(context: string, configFilePath?: string): Promise<SWACLIConfig & { context?: string }> {
  const swaCliConfigFile = configFilePath ?? (await findSwaCliConfig(process.cwd()));
  if (!swaCliConfigFile) {
    return {};
  }

  const cliConfig = await parseSwaCliConfig(swaCliConfigFile);
  if (cliConfig.configurations === undefined) {
    logger.error(`${swaCliConfigFilename} is missing the "configurations" property. No options will be loaded.`);
    return {};
  }

  const hasOnlyOneConfig = Object.entries(cliConfig.configurations).length === 1;
  if (hasOnlyOneConfig && context === defaultStartContext) {
    const [configName, config] = Object.entries(cliConfig.configurations)[0];
    printConfigMsg(configName, swaCliConfigFile);
    return config;
  }

  const config = cliConfig.configurations?.[context];
  if (config) {
    printConfigMsg(context, swaCliConfigFile);
    return config;
  }

  return {};
}
