const { generateGuid } = require("./src/services/guid");
const constants = {
  appConfig: {
    appName: "EXTENSION_NAME",
    urls: {
      chrome:
          "CHROME_STORE_URL",
      firefox: "FIREFOX_STORE_URL",
      edge:
          "EDGE_STORE_URL",
    },
    // put extension key here if required which would only be used in development mode
    key:
    // eslint-disable-next-line max-len
        "-----BEGIN PUBLIC KEY-----\nMssIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhnjCHD79hDbWfqjnP9SW\nN0AXmXHh5eVk2D0oMILadmj/2uRQm/jNpnlvjVHY+899gdYRH/k7v4f+qF6gV3Yh\nwb/2PnW9PEo2VksgiixSesccvcwRXEJSngtxNWOARYSOTqTCCum9rjFVPZL+voh7\ndUsTN45D+RBLQORYbu5NtSM6RcGhUbYvhAosKwo+lsOAjM5niQDLJi//dZ9R32tc\n6tht4XrP59CTWBo8JCpIcHT6edN2HQ2vRiO5CHVb2jfT1hrO82WZ9LWsErzo/gCr\nXyIvnnXjg1wif7++WTi5mQl05Ohv3vKazNLeFpl/2XxvJ1xw4Pfh7m2qMaBJd7ll\n3QIDAQAB\n-----END PUBLIC KEY-----",
  },
  contentScript: {
    mountId: generateGuid(),
  },
  browser: {
    firefox: {
      manifest: {
        browser_specific_settings: {
          gecko: {
            id: "GECKO_ID",
            strict_min_version: "42.0",
          },
        },
      },
    },
  },
  support: {
    donate: "https://www.patreon.com/fxnoob",
    howToVideoLink: "TUTORIAL_LINK",
    uninstallFeedbackForm: "HTTPS://FEEDBACK_FORM_LINK",
  },
};

module.exports = constants;

