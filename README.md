<p align="center">
  <img style="width: 50; height: 50" src="frontend/static/icon.png" />
</p>

## Installation

1. Make sure to have [Node](https://nodejs.org/en) installed
2. Run `npm run install:all` in root directory (Custom command for installing svelte+electron dependencies)
3. Run `npm run dev` to run the application

## Electron

Electron is used as the source of the application and stores all data in `Electron Store` (Json database). All data displayed in the frontend comes from Electron and Electron as the source of truth gives us consistency between all devices, even if it got connected in a different state.

Any data sent from Electron to the client is using a generalized `EventListener` that sends any event to both the Electron and external clients using Ipc or WebSockets respectfully.

## Svelte

Svelte is the UI of the application and utilizes svelte's built in `Store API` to communicate data throughout the app using a global `EventListener` to receive or send events anywhere in the application. The `EventListener` is generalized between Electron and Svelte and handles events equally between every device.

## Self Served Functionality

Being able to open the app on external devices requires the electron app to serve itself. This is accomplished in the dev environment by utilizing the `vite server` url. In production we first build the Svelte application before bundling it in the final electron build and serving the app utilizing express on startup.

## Build Targets

Windows: `npm run build:win`\
Mac: `npm run build:mac`\
Linux: `npm run build:linux`
