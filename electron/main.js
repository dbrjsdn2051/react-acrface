const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
    const isMac = process.platform === "darwin";
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        minWidth: 1400,
        minHeight: 900,
        // HD360 정합: mac → hiddenInset (traffic light 만 보임), 좌측 80px 자리 비움
        //          Windows/Linux → frame:false (시스템 버튼도 React 가 그림)
        frame: isMac ? undefined : false,
        titleBarStyle: isMac ? "hiddenInset" : "hidden",
        trafficLightPosition: isMac ? { x: 12, y: 14 } : undefined,
        backgroundColor: "#000000",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false,
            preload: path.join(__dirname, "preload.js"),
        }
    });

    mainWindow.loadFile(path.join(__dirname, "./dist/index.html"));

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
})

ipcMain.on("window:minimize", () => mainWindow?.minimize())
ipcMain.on("window:maximize", () => {
    mainWindow?.isMaximized() ? mainWindow?.unmaximize() : mainWindow?.maximize();
})
ipcMain.on("window:close", () => mainWindow?.close())