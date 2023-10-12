const path = require('path');
const url = require('url');
const { app, BrowserWindow, screen, globalShortcut } = require('electron');
let os = require('os')
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
    win.maximize()
    win.setMenu(null);





    win.on('resize', () => {


        try {

            WindowSize()

        }
        catch (e) {
            console.log(e);
        }


    }
    );
    win.webContents.setBackgroundThrottling(false);


    win.on('closed', () => {
        win = null;
    });

}

function WindowSize() {
    const [x, y] = win.getPosition()

    const width = Math.round((screen.getPrimaryDisplay().size.width * 20) / 100) < 350 ? 350 : Math.round((screen.getPrimaryDisplay().size.width * 20) / 100)
    const height = width
    if (os.platform !== "darwin") {
        win.setBounds({ x, y, width, height })
    }
    else {
        if (!x >= 45) {
            x = 45

        }
        if (y >= 45) {
            y = 45
        }
        win.setBounds({ x, y, width, height })
    }


    win.setAlwaysOnTop(true, 'normal', 'bellow');
}
app.on("ready", createWindow);
