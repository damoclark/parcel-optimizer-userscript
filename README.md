# parcel-optimizer-userscript

## Overview
Parcel plugin for userscript development - adds the metadata header to your .user.js file.

## Installation

```sh
npm install -D parcel @damoclarky/parcel-optimizer-userscript
```

In your package.json:
```json
{
  "name": "Userscript Name",
  "version": "1.0.0",
  "description": "",
  "main": "dist/userscript.user.js",
  "source": "src/userscript.user.mjs",
  "scripts": {
    "watch": "npx parcel watch",
    "build": "npx parcel build src/userscript.user.mjs"
  },
  "devDependencies": {
    "@damoclarky/parcel-optimizer-userscript": "^0.0.1",
    "parcel": "^2.7.0"
  }
}
```
Then add the following config files:

.parcelrc
```json
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.user.{mjs,js,ts}": ["...", "@damoclarky/parcel-optimizer-userscript"]
  }
}
```
Where `*.user.{mjs,js,ts}` matches the filename for your `main` userscript file in your package.json.  

.userscriptrc
```json
{
  "userscriptMeta": "path/to/userscript.meta.js"
}
```
and `userscriptMeta` points to the file containing the metadata header for your userscript

Example for `userscript.meta.js`
```js
// ==UserScript==
// @name        Userscript Name
// @namespace   https://userscript.com
// @description Description
// @include     https:/*
// @version     0.0.1
// @noframes
// @grant       none
// ==/UserScript==
```

## Usage

While developing:
```sh
npx parcel watch --no-hmr
```

To produce final build:
```sh
npx parcel build src/userscript.user.mjs
```

## Licence

MIT

## Acknowledgements / Attribution

Original source code written by AKP Tools (https://github.com/akp-tools).

