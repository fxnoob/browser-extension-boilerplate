/**
 * I18n get translations
 */
const t = key => {
  return chrome.i18n.getMessage(key);
};
export {
  t,
};
