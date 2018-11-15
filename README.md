# Botcap

This is a simple browser project made from electron. It looks like Chrome and you can use it to build your own browser.

The goal of this project is not to make a full-featured browser, but to be a good scaffold to let you make your custom 
browser easier.

**This project has not completed yet**

## How to contribute

The meaning of each directories like below:

```
├── app                         // Electron app folder, all files in this folder will be packaged
│   ├── assets                  // Static resources
|   ├── background-process      // Electron's background process
|   |   └── main.js             // The main entry file
|   ├── build-in-pages          // Build-in pages, such as blank/error pages
|   ├── renderer                // Electron's renderer pages, **This folder is built by vue**
|   └── package.json            // package.json file for electron app
├── build                       // Build resources for electron-builder
├── dist                        // Contains the target file, such as .exe / .dmg
├── shell-window-src            // Source files for `app/renderer`, which build from vue CLI 3
|   ├── public                  // Public resources which will be copied to `app/renderer` foler
|   |   ├── src
|   |   |   ├── main            // Source of main browser frame window
|   |   |   └── shared          // Shared files for pages
|   |   └── package.json        // package.json for vue codes
├── electron-builder.json       // electron-builder configure file
├── package.json                // The main package.json file
└── README.md
```

The main browser is built from VueJS, so you have to know the basic usage of Vue.

### Install dependencies

This project has 3 `package.json` files. You must install all dependencies from them:

```bash
npm install

cd app
npm install

cd ../shell-window-src
npm install
```

### Dev

You can run webpack dev server and electron in 2 bash window

```bash
cd shell-window-src
npm run serve
```

```bash
npm run dev
```
