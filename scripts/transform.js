const constants = require("../constants");
// options: webpack configs
const manifestTransform = (content, path, options) => {
  const { mode } = options;
  const modify = buffer => {
    // copy-webpack-plugin passes a buffer
    const manifest = JSON.parse(buffer.toString());
    // make any modifications you like, such as
    if (mode == "development") {
      manifest.key = constants.appConfig.key;
    }
    // pretty print to JSON with two spaces
    return JSON.stringify(manifest, null, 2);
  };
  return modify(content);
};

module.exports = {
  manifestTransform
};
