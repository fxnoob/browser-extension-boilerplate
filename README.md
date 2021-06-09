# A Browser(Chrome/Edge/Opera/Firefox/Brave) extension boilerplate.

## Prerequisites

- yarn 1.22.10
- node v16.1.0

## Pre-configurations

> * Replace `Constants.appConfig.key` in `constants.js` with your chrome extension's key obtained from chrome developer extension dashboard.
> * Set `GECKO_ID` in `constants.js` and Set other configurations in `constants.js` when required.
> * Set extension next version in `package.json` version before building.
> * Generate locale for key `appName` and `appDescription` for extension's name and description. See `yarn generate:locale`.

## Basic Usage

### Locale generate/Delete

Generate locale
````
yarn generate:locale
````

Delete locale
````
yarn delete:locale
````

### Build

#### For Local Development

#### For Chromium Development Build

```
yarn
yarn dev:chromium
```

#### For Firefox Development Build

```
yarn
yarn dev:firefox
```

#### For Production Release

> Note: Before creating production build. Set version in package.json's version. that will be extension's build version. 

#### For Chromium Build

```
yarn
yarn build:chromium
```

#### For Firefox Build

```
yarn
yarn build:firefox
```



## features:

> 1. Support for ESNEXT ( with Babel and polyfill).
> 2. Popup page with reactjs and material ui framework.
> 3. Content script with reactjs and material ui framework.
> 5. Option Page with reactjs and material ui framework + tailwind css.
> 5. Bundling (webpack).
> 6. Cross-browser configurations.
> 7. Generate multiple-language (Auto-translations) locales from english locales. See `yarn generate:locale` and `yarn delete:locale`. 
> 8. Some (useful) services e.g. DbService, messagePassing, chromeService and helper functions(helpers).
> 9. Some (useful) react components e.g. FrameMUI.js (To mount react mui component in iframe in content script).
> 10. Locale translation using unofficial google translate API (Free version).
> 11. Comes with React 18(alpha release). you can downgrade it to 17.* but not lower than that. 

## directory structure

> - `src/` is root directory for a chrome extension. it includes `manifest.json` file and other static stuff.

> - `src/background.js` is main background js file for the chrome extension.

> - `src/components` is the directory which includes react js components.

> - `src/popup-page` is the directory which includes react js setup for popup page.

> - `src/option-page` is the directory which includes react js setup for option pages.

> - `src/content-scripts` is the directory which includes react js setup for content script.

> - `src/services` is the directory for services that can be written in es6,es7 or es8...

## How to extend ?

> - Write extension's background scripts code in `src/background.js`

> - Write extension's react components in `src/components/` directory.

> - Write extension's popup page codes in `src/popup-page/` directory.

> - Write extension's option page codes in `src/option-page` directory.

> - Write extension's content scripts codes in `src/content-scripts` directory.

> - Write extension's services codes in `src/services` directory.
