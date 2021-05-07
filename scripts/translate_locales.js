/* eslint-disable no-console */
const jsonfile = require("jsonfile");
const path = require("path");
const { translate, locales } = require("./translate");
/**
 *
 * takes updated locale_en.json
 * updates json content in ../src/app/_locales/${locale}/messages.json
 *
 * */
async function translateLocales() {
  const updatedLocaleEn = jsonfile.readFileSync(
    path.join(__dirname, "locale_en.json")
  );
  const newKeys = Object.keys(updatedLocaleEn);
  const targetDirRoot = path.join(__dirname, "../src/app/_locales");
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const oldJsonFilePath = path.join(
      targetDirRoot,
      `/${locale}/messages.json`
    );
    const oldJsonFile = jsonfile.readFileSync(oldJsonFilePath);
    for (let j = 0; j < newKeys.length; j++) {
      const newKey = newKeys[j];
      if (!oldJsonFile[newKey]) {
        const message = updatedLocaleEn[newKey].message;
        const { translation } = await translate("en", locale, message);
        oldJsonFile[newKey] = {
          message: translation,
          description: updatedLocaleEn[newKey].description,
        };
        console.log("updating key ->", newKey, "  ->  ", oldJsonFile[newKey]);
      }
    }
    jsonfile.writeFileSync(oldJsonFilePath, oldJsonFile, { flag: "w" });
  }
}
export { translateLocales };
