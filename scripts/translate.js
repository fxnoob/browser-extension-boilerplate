const translateNG = require("node-google-translate-skidz");
const locales = [
  "ar",
  "am",
  "bg",
  "bn",
  " ca",
  " cs",
  " da",
  " de",
  " el",
  " en",
  " es",
  " et",
  "fa",
  " fi",
  " fil",
  " fr",
  "gu",
  " he",
  " hi",
  " hr",
  " hu",
  " id",
  " it",
  " ja",
  "kn",
  " ko",
  " lt",
  " lv",
  "ml",
  "mr",
  "ms",
  " nl",
  " no",
  " pl",
  " pt",
  " ro",
  " ru",
  " sk",
  " sl",
  " sr",
  " sv",
  "sw",
  "ta",
  "te",
  " th",
  " tr",
  " uk",
  " vi",
  " zh",
].map((locale) => locale.trim());
async function translate(sourceEn, targetEn, text) {
  return new Promise((resolve, reject) => {
    try {
      translateNG(
        {
          text: text,
          source: sourceEn,
          target: targetEn,
        },
        (res) => {
          resolve(res);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  locales,
  translate,
};
