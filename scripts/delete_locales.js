/* eslint-disable no-console */
const jsonfile = require("jsonfile");
const path = require("path");
const { locales } = require("./translate");
/**
 *
 * takes updated locale_en.json
 * delete provided locale keys from ../src/app/_locales/${locale}/messages.json
 *
 * */
function deleteLocales(keys) {
  const targetDirRoot = path.join(__dirname, "../src/app/_locales");
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const oldJsonFilePath = path.join(
      targetDirRoot,
      `/${locale}/messages.json`
    );
    const oldJsonFile = jsonfile.readFileSync(oldJsonFilePath);
    for (let j = 0; j < keys.length; j++) {
      if (oldJsonFile[keys[j].key]) {
        delete oldJsonFile[keys[j].key];
        console.log("deleting key ->", keys[j].key);
      }
    }
    jsonfile.writeFileSync(oldJsonFilePath, oldJsonFile, { flag: "w" });
  }
}
export { deleteLocales };
