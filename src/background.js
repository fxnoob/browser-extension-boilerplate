import "@babel/polyfill";
import chromeService, { message } from "./services/chromeService";
import Routes from "./routes";

let AppInitState = 0; // it means app is off on startup

/**
 * Main extension functionality
 *
 * @class Main
 */
class Main {
  constructor() {
    this.init();
  }

  init = async () => {
    this.popUpClickSetup();
    await Routes(message);
  };

  popUpClickSetup() {
    chrome.browserAction.onClicked.addListener(() => {
      if (this.toggleApp()) {
        chromeService.openHelpPage("");
      } else {
        this.stopApp();
      }
    });
  }

  /**
   * toggle app
   *
   * @method
   * @memberof Main
   */
  toggleApp = () => {
    AppInitState = AppInitState ? 0 : 1;
    return AppInitState;
  };

  /**
   * stop app
   *
   * @method
   * @memberof Main
   */
  stopApp = () => {
    AppInitState = 0;
  };
}

new Main();
