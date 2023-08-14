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
    key: "-----BEGIN PUBLIC KEY-----\n" +
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp2M7a3NkVXE+hEmPzpfy\n" +
        "L5xQKCPiGotVzC1Ep8XSfimPS5hXw0MBnkP2pxJKwHXeFQDthz6bx837aTwenw2L\n" +
        "kmaSwzJK5cUBcAzvbx4H1WOyXaZO1G4/iIDP0A0L1KXu/gCIyYpPXXwLtbqXp78s\n" +
        "6EpEqJOepSDdkoOKg/ejZq+/gpbVfY4k9CMprX2Jylq+orXrViH3jdVic3QXZDdp\n" +
        "mNRTjmUmJii1DTCxYh9207YSVe3bfY1TGQjKx2GcUAGiJBhNwcgFqkdVdkArGuJs\n" +
        "zuPO5HthTF3u6AouhuLnIWOSHiXZg8KL/g5Jv2t9XuJuth2mzcrXlFVYtCd3k5+q\n" +
        "mQIDAQAB\n" +
        "-----END PUBLIC KEY-----", // gather it from extension store
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
