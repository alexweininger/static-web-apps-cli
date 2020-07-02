const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const YAML = require("yaml");

module.exports.readConfigFile = () => {
  const githubActionFolder = path.resolve(process.cwd(), ".github/workflows/");

  // find the SWA GitHub action file
  let githubActionContent;
  try {
    let githubActionFile = fs
      .readdirSync(githubActionFolder)
      .filter((file) => file.includes("azure-static-web-apps") && file.endsWith(".yml"))
      .pop();

    githubActionFile = path.resolve(githubActionFolder, githubActionFile);
    if (githubActionFile && process.env.DEBUG) {
      console.log("> Found config file:", githubActionFile);
    }

    githubActionContent = fs.readFileSync(githubActionFile, "utf8");
  } catch (err) {
    console.error(err);
    shell.echo("No SWA configuration build found.");
    shell.exit(0);
  }

  const swaYaml = YAML.parse(githubActionContent);
  const swaBuildConfig = swaYaml.jobs.build_and_deploy_job.steps.find((step) => step.uses && step.uses.includes("static-web-apps-deploy"));
  const {
    app_location = "/",
    app_artifact_location = "/",
    api_location = "api",
    app_build_command = "npm run build",
    api_build_command = "npm run build",
  } = swaBuildConfig.with;

  return {
    app_location,
    api_location,
    app_build_command,
    api_build_command,

    // the app_artifact_location must be under the user's project folder
    app_artifact_location: path.resolve(process.cwd(), app_artifact_location),
  };
};
