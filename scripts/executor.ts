import logger from "../logger";
import addVisibilitySettingsToUserData from "./add-visibility-settings-to-user-data";
import removeVisibilitySettingsFromUserData from "./remove-visibility-settings-from-user-data";

const scripts = {
  addVisibilitySettingsToUserData,
  removeVisibilitySettingsFromUserData,
};

/**
 * Main executor function.
 * Ideation:
 *   If we keep adding scripts in package.json for each opertion, there will be too many scripts.
 *   We can instead use this file and pass the script as param.
 *
 *  Error handling can be done by each script separately.
 */
async function execute() {
  if (process.argv.length !== 3 || !scripts[process.argv[2]]) {
    logger.info("Invalid args. Requires exactly 1 arg to be passed");
    logger.info("");
    logger.info("Usage: npm run execute [script]");
    logger.info("");
    logger.info("Valid scripts:");
    Object.keys(scripts).map((scriptName) => logger.info(` - ${scriptName}`));
    process.exit(0);
  }

  const script = scripts[process.argv[2]];

  // execute the script
  await script();
  logger.info("process completed successfully");
  process.exit(0);
}

execute();
