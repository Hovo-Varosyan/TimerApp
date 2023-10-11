const path = require('path');
const url = require('url');
const { app, BrowserWindow, screen } = require('electron');

let win;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        width: width,
        height: height,
        icon: path.join(__dirname, 'public/images/icon.ico')
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.setMenu(null);
    win.on('minimize', (event) => {
        event.preventDefault(); 
        win.hide(); 
      });
    win.on('closed', () => {
    win = null;
});

}


app.on("ready", createWindow);
