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
    return new Promise(resolve => {
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
    return new Promise(resolve => {
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
    const config = { active: true, currentWindow: true };
    if (winId) {
      config.windowId = winId;
    }
    return new Promise(resolve => {
      chrome.tabs.query(config, tabs => {
        resolve(tabs[0]);
      });
    });
  };

  sendMessageToActiveTab = async (payload, callback) => {
    try {
      const tab = await this.getActiveTab();
      chrome.tabs.sendMessage(tab.id, payload, callback);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return true;
  };

  sendMessageToTab = async (id, payload, callback) => {
    try {
      chrome.tabs.sendMessage(id, payload, callback);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return true;
  };

  traverseTabs = callback => {
    chrome.tabs.query({}, tabs => {
      callback(tabs);
    });
  };

  shiftToLeftTab = () => {
    this.traverseTabs(tabs => {
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

  takeScreenShot = () => {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.captureVisibleTab(screenshotUrl => {
          resolve(screenshotUrl);
        });
      } catch (e) {
        reject(e);
      }
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
      const tabId = tabs[0].id;
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
   *Set Badge color on extension icon
   * @method
   * @memberOf ChromeApi
   */
  setBadgeColorOnActionIcon(color) {
    chrome.browserAction.setBadgeBackgroundColor({ color });
  }
  /**
   * Open help page
   *
   * @method
   * @memberof ChromeApi
   */
  openHelpPage = (path = "home") => {
    const helpUrl = `${chrome.runtime.getURL("option.html")}?path=${path}`;
    chrome.tabs.create({ url: helpUrl }, () => {});
  };
  /**
   * create context menu
   *
   * @method
   * @memberof ChromeApi
   */
  createContextMenu = opts => {
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
      onEvent: function(event) {
        if (event.type === "end") {
          callback();
        }
      }
    });
  }
  /**
   * tts stop
   *
   * @method
   * @memberof ChromeApi
   */
  stop() {
    chrome.tts.stop();
  }
  /**
   * I18n getMessage
   *
   * @method
   * @memberof ChromeApi
   */
  getI18nMessage(key) {
    return chrome.i18n.getMessage(key);
  }
}
const chromeService = new ChromeApi();

/**
 * Message Passing API Class
 *
 * @export
 * @class MessagePassing
 */
class MessagePassing {
  constructor() {
    this.routes = {};
    this.options = {};
    this.addListener();
  }
  /**
   * set options object for message passing api
   *
   * @method
   * @memberof MessagePassing
   * @namespace message.on
   */
  setOptions(options) {
    this.options = options;
  }
  /**
   * set callback for different routes (just like express js)
   *
   * @method
   * @memberof MessagePassing
   * @namespace message.on
   */
  on(path, callback) {
    this.routes[path] = callback;
  }
  /**
   * execute routes callback manually
   *
   * @method
   * @memberof MessagePassing
   * @namespace message.exec
   */
  async exec(path, ...data) {
    return await this.routes[path](...data);
  }
  /**
   * Listener for message callback if set any
   *
   * @method
   * @memberof MessagePassing
   * @namespace message.addListener
   */
  addListener() {
    chrome.runtime.onMessage.addListener((req, sender, res) => {
      try {
        this.routes[req.path](req, res, this.options);
      } catch (e) {
        /* eslint-disable no-console */
        console.log(e);
        /* eslint-enable no-console */
      }
      return true;
    });
  }
  /**
   * send message from content script or background page.
   *
   * @method
   * @memberof MessagePassing
   * @namespace message.sendMessage
   */
  sendMessage(path, payload, callback) {
    const data = payload;
    data.path = path;
    chrome.runtime.sendMessage(data, callback);
  }
  /**
   * send message from background page to content script
   *
   * @method
   * @memberof MessagePassing
   * @namespace message.sendMessageToActiveTab
   */
  async sendMessageToActiveTab(path, payload, callback) {
    const data = payload;
    data.path = path;
    await chromeService.sendMessageToActiveTab(data, callback);
  }
  /**
   * send message from background page to content script
   *
   * @method
   * @memberof MessagePassing
   * @namespace message.sendMessageToTab
   */
  async sendMessageToTab(path, id, payload, callback) {
    const data = payload;
    data.path = path;
    await chromeService.sendMessageToTab(id, data, callback);
  }
}
const message = new MessagePassing();

export { message };
export default chromeService;
