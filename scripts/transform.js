const constants = require("../constants");
const pkg = require("../package.json");
// options: webpack configs
const manifestTransform = (content, path, options) => {
  const { mode, browser } = options;
  const modify = (buffer) => {
    // copy-webpack-plugin passes a buffer
    const manifest = JSON.parse(buffer.toString());
    // make any modifications you like, such as
    if (mode == "development") {
      manifest.key = constants.appConfig.key;
    }
    manifest.version = pkg.version;
    // if browser is firefox then put gecko id and other specific stuff
    if (browser == "firefox") {
      Object.keys(constants.browser.firefox.manifest).map((key) => {
        manifest[key] = constants.browser.firefox.manifest[key];
      });
    }
    // pretty print to JSON with two spaces
    return JSON.stringify(manifest, null, 2);
  };
  return modify(content);
};

module.exports = {
  manifestTransform,
};
