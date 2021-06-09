/**
 * Abstraction class to interact with the chrome extension API
 *
 * @export
 * @class ChromeApi
 */
class ChromeApi {
  /**
   * I18n getMessage
   *
   * @method
   * @memberof ChromeApi
   */
  getI18nMessage(key) {
    return chrome.i18n.getMessage(key);
  }
  /**
   * Get active tab of the given window
   *
   * @method
   *@param {Number}
   * @memberof ChromeApi
   */
  getActiveTab = (winId) => {
    const config = { active: true };
    if (winId) {
      config.windowId = winId;
    }
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query(config, (tabs) => {
          resolve(tabs[0]);
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  sendMessageToActiveTab = async (payload, callback) => {
    const tab = await this.getActiveTab();
    chrome.tabs.sendMessage(tab.id, payload, callback);
    return true;
  };
  /**
   *Set Badge on extension icon
   * @method
   * @memberOf ChromeApi
   */
  setBadgeOnActionIcon(badge) {
    chrome.browserAction.setBadgeText({ text: badge });
  }

  /**
   * Open help page
   *
   * @method
   * @memberof ChromeApi
   */
  openHelpPage = (path = "home", data = "") => {
    const helpUrl = `${chrome.runtime.getURL(
      "option.html"
    )}?path=${path}&url=${data}`;
    chrome.tabs.create({ url: helpUrl }, () => {});
  };

  createContextMenu = (opts) => {
    return chrome.contextMenus.create(opts);
  };
  /**
   * tts speak
   *
   * @method
   * @memberof ChromeApi
   */
  speak(text, callback) {
    chrome.tts.speak(text, {
      requiredEventTypes: ["end"],
      onEvent: function (event) {
        if (event.type === "end") {
          callback();
        }
      },
    });
  }
  stop() {
    chrome.tts.stop();
  }
}
const chromeService = new ChromeApi();
export default chromeService;
