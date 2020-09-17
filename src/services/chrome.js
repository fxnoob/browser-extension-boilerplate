/**
 * Abstraction class to interact with the chrome extension API
 *
 * @export
 * @class ChromeApi
 */
class ChromeApi {
  constructor() {}

  /**
   * Get tab info based on it's tab id
   *
   * @method
   * @param {Number} tab id
   * @memberof ChromeApi
   */
  getTabInfo = tabId => {
    return new Promise(resolve => {
      chrome.tabs.get(tabId, tab => {
        resolve(tab);
      });
    });
  };

  sendMessageFromContentScript = (infoObj, callback) => {
    const objString = JSON.stringify(infoObj);
    chrome.runtime.sendMessage(objString, response => {
      callback(response);
    });
  };
  /**
   *
   *Remove url from history
   *
   *@method
   *@param {string} url
   *@memberof ChromeApi
   */
  removeFromHistory = url => {
    chrome.history.deleteUrl({ url: url });
  };

  /**
   * Create incognito window
   *
   * @method
   * @memberof ChromeApi
   */
  createIncognitoWindow = () => {
    return new Promise((resolve, reject) => {
      chrome.windows.create({ focused: true, incognito: true }, win => {
        resolve(win);
      });
    });
  };

  /**
   * Get window information
   *
   * @method
   *@param {Number} window id
   * @memberof ChromeApi
   */
  getWindow = winId => {
    return new Promise((resolve, reject) => {
      chrome.windows.get(winId, info => {
        resolve(info);
      });
    });
  };

  /**
   * Callback of chrome.windows.onRemoved
   *
   * @method
   *@param {Number} window id
   * @memberof ChromeApi
   */
  onIncognitoWindowClosed = winId => {
    if (this.win) {
      if (this.win.id === winId) this.win = false;
    }
  };

  /**
   * Create new tab in incognito window
   *
   * @method
   *@param {Object} obj Object argument for createIncognitoTab
   * @param {string} obj.url url for the tab
   * @memberof ChromeApi
   */
  createIncognitoTab = async obj => {
    if (!this.win) {
      this.win = await this.createIncognitoWindow();
      const tab = await this.getActiveTab(this.win.id);
      chrome.tabs.update(tab.id, obj);
    } else {
      chrome.tabs.create({
        ...obj,
        selected: true,
        active: true,
        windowId: this.win.id
      });
    }
    chrome.windows.update(this.win.id, { focused: true });
    return true;
  };

  /**
   * Get active tab of the given window
   *
   * @method
   *@param {Number}
   * @memberof ChromeApi
   */
  getActiveTab = winId => {
    const config = { active: true };
    if (winId) {
      config.windowId = winId;
    }
    return new Promise((resolve, reject) => {
      chrome.tabs.query(config, tabs => {
        resolve(tabs[0]);
      });
    });
  };

  sendMessageToActiveTab = async payload => {
    console.log("sendMessageToActiveTab called", payload);
    const tab = await this.getActiveTab();
    console.log({ tab });
    chrome.tabs.sendMessage(tab.id, payload);
    return true;
  };

  traverseTabs = callback => {
    chrome.tabs.query({}, tabs => {
      callback(tabs);
    });
  };

  shiftToLeftTab = () => {
    this.traverseTabs(tabs => {
      console.log(tabs, tabs.length, "tabs info");
      let activeTabIndex = -1;
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
          activeTabIndex = i;
          break;
        }
      }
      if (activeTabIndex === 0) {
        chrome.tabs.update(tabs[tabs.length - 2].id, { highlighted: true });
      } else {
        chrome.tabs.update(tabs[activeTabIndex - 1].id, { highlighted: true });
      }
      chrome.tabs.update(tabs[activeTabIndex].id, { highlighted: false });
    });
  };

  shiftToRightTab = () => {
    this.traverseTabs(tabs => {
      let activeTabIndex = -1;
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
          activeTabIndex = i;
          break;
        }
      }
      if (activeTabIndex === tabs.length - 1) {
        chrome.tabs.update(tabs[0].id, { highlighted: true });
      } else {
        chrome.tabs.update(tabs[activeTabIndex + 1].id, { highlighted: true });
      }
      chrome.tabs.update(tabs[activeTabIndex].id, { highlighted: false });
    });
  };

  closeActiveTab = callback => {
    chrome.tabs.query({ active: true }, tabs => {
      console.log({ tabs });
      var url = tabs[0].url;
      const tabId = tabs[0].id;
      //console.log("URL from main.js", url);
      chrome.tabs.remove(tabId, callback);
    });
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
  openHelpPage = (url = "") => {
    const helpUrl = chrome.runtime.getURL("option.html") + `?url=${url}`;
    chrome.tabs.create({ url: helpUrl }, () => {});
  };

  createContextMenu = opts => {
    return chrome.contextMenus.create(opts);
  };
}
const chromeService = new ChromeApi();
export default chromeService;
