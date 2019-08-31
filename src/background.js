import "@babel/polyfill";

let AppInitState = 0; // it means app is off on startup

class Main {
  constructor() {}
  popUpClickSetup() {
    chrome.browserAction.onClicked.addListener(tab => {
      if (this.toggleApp()) {
      } else {
        this.stopApp();
      }
    });
  }

  toggleApp = () => {
    AppInitState = AppInitState ? 0 : 1;
    return AppInitState;
  };

  stopApp = () => {
    AppInitState = 0;
  };
}
