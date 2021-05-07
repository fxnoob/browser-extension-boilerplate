const baseConfig = require("./webpack.config");
module.exports = (env, options) => {
  return baseConfig(env, {
    ...options, // app specific configurations
    browser: "chromium",
  });
};
