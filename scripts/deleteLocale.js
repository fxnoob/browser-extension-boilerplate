/* eslint-disable no-console */
import path from "path";
import chalk from "chalk/source";
import arg from "arg";
import inquirer from "inquirer";
import { deleteLocales } from "./delete_locales";
const jsonfile = require("jsonfile");
const mainLocaleJsonFile = path.join(__dirname, "./locale_en.json");
const localeJson = jsonfile.readFileSync(mainLocaleJsonFile);

function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--key": String,
      "--del": Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    key: args["--key"] || null,
    del: args["--del"] || null,
  };
}
function isNull(val) {
  return val == null;
}
async function promptForMissingOptions(options) {
  const validateInput = (propName) => (value) => {
    if (value == "") return `${propName} can't be Empty!`;
    else if (propName == "key") {
      if (!localeJson.hasOwnProperty(value)) {
        return "key does not exist!";
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
  if (isNull(options.delete)) {
    questions.push({
      type: "confirm",
      name: "del",
      default: false,
      message: "do you really want to delete this locale?",
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    key: options.key || answers.key,
    del: options.del || answers.del,
  };
}
async function updatelocales(options) {
  const { key } = options;
  /* delete key and update main en locale file */
  delete localeJson[key];
  jsonfile.writeFileSync(mainLocaleJsonFile, localeJson, {
    flag: "w",
  });
  /* update other locale files */
  deleteLocales([{ key: key }]);
}
export async function cli(args) {
  let options = parseArgsIntoOptions(args);
  options = await promptForMissingOptions(options);
  if (!options.del) return;
  // delete the key value from the json file and then update all locales
  await updatelocales(options);
  console.log(chalk.cyan(`locale key ${options.key} has been deleted!`));
}
