class MessagePassing {
  constructor() {
    this.routes = {};
    this.options = {};
    this.listenerMode = true;
    this.addListener();
  }
  setListenerMode(mode) {
    this.listenerMode = mode;
  }
  setOptions(options) {
    this.options = options;
  }
  on(path, callback) {
    this.routes[path] = callback;
  }
  getActiveTab = (winId) => {
    const config = { active: true, currentWindow: true };
    if (winId) {
      config.windowId = winId;
    }
    return new Promise((resolve) => {
      chrome.tabs.query(config, (tabs) => {
        resolve(tabs[0]);
      });
    });
  };
  addListener() {
    chrome.runtime.onMessage.addListener((req, sender, res) => {
      if (!this.listenerMode) return;
      try {
        this.routes[req.path](req, res, this.options);
      } catch (e) {
        /* eslint-disable no-console */
        console.log(e);
        console.log({ path: req.path });
        /* eslint-enable no-console */
      }
      return true;
    });
  }
  sendMessage(path, payload, callback) {
    const data = payload;
    data.path = path;
    chrome.runtime.sendMessage(data, callback);
  }
  async sendMessageToActiveTab(path, payload, callback) {
    payload.path = path;
    try {
      const tab = await this.getActiveTab();
      chrome.tabs.sendMessage(tab.id, payload, callback);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return true;
  }
  async sendMessageToTab(path, id, payload, callback) {
    payload.path = path;
    try {
      chrome.tabs.sendMessage(id, payload, callback);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return true;
  }
}
const mp = new MessagePassing();
export default mp;
