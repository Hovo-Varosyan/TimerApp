const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: "100%",
        height: "100%",
        icon: path.join(__dirname, 'public/images/icon.ico')
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.setMenu(null);

    win.on('closed', () => {
    win = null;
});

}


app.on("ready", createWindow);
