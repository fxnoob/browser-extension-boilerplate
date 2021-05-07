/* eslint-disable no-console */
import path from "path";
import chalk from "chalk/source";
import arg from "arg";
import inquirer from "inquirer";
import { translateLocales } from "./translate_locales";
const jsonfile = require("jsonfile");

const mainLocaleJsonFile = path.join(__dirname, "./locale_en.json");
const localeJson = jsonfile.readFileSync(mainLocaleJsonFile);

async function promptForMissingOptions(options) {
  const validateInput = (propName) => (value) => {
    if (value == "") return `${propName} can't be Empty!`;
    else if (propName == "key") {
      if (localeJson.hasOwnProperty(value)) {
        return "key already exist!";
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const questions = [];
  if (isNull(options.key)) {
    questions.push({
      type: "input",
      validate: validateInput("key"),
      name: "key",
      message: "type key name:",
    });
  }
  if (isNull(options.value)) {
    questions.push({
      type: "input",
      name: "value",
      validate: validateInput("value"),
      message: "Type value of the key:",
    });
  }
  if (isNull(options.install)) {
    questions.push({
      type: "confirm",
      name: "install",
      default: false,
      message: "do you really want to create this locale?",
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    key: options.key || answers.key,
    value: options.value || answers.value,
    install: options.install || answers.install,
  };
}
function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--key": String,
      "--value": String,
      "--install": Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    key: args["--key"] || null,
    value: args["--value"] || null,
    install: args["--install"] || null,
  };
}
function isNull(val) {
  return val == null;
}
async function updateLocales(locale) {
  localeJson[locale.key] = {
    message: locale.value,
    description: locale.value,
  };
  jsonfile.writeFileSync(mainLocaleJsonFile, localeJson, { flag: "w" });
  /** translate locales*/
  await translateLocales();
}
export async function cli(args) {
  let options = parseArgsIntoOptions(args);
  options = await promptForMissingOptions(options);
  if (!options.install) return;
  // write key value in the json file
  await updateLocales(options);
  console.log(chalk.cyan(`${options.key} has been created!`));
}
