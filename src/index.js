const path = require(`path`);
const url = require(`url`);
const { app, BrowserWindow, screen, globalShortcut, dialog } = require(`electron`);
let os = require(`os`)
const { autoUpdater } = require(`electron-updater`)

let win;

function createWindow() {
    autoUpdater.autoDownload = true;
    autoUpdater.allowPrerelease = true; // Разрешить загрузку предварительных версий (опционально)
    autoUpdater.devMode = true; // Включить проверку обновлений в режиме разработки
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    autoUpdater.checkForUpdates()

    win = new BrowserWindow({
        width: width,
        height: height,
        icon: path.join(__dirname, `public/images/icon.ico`)
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, `index.html`),
        protocol: `file`,
        slashes: true
    }));

    win.maximize()
    win.setMenu(null);

    win.on(`resize`, () => {


        try {

            WindowSize()

        }
        catch (e) {
            console.log(e);
        }


    }
    );
    win.webContents.setBackgroundThrottling(false);
    app.on(`activate`, () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });

    win.on(`closed`, () => {
        win = null;
    });

    autoUpdater.on(`update-available`, (_event, releaseNotes, releaseName) => {
        const dialogOpts = {
            type: `info`,
            buttons: [`Ok`],
            title: `Update Available`,
            message: process.platform === `win32` ? releaseNotes : releaseName,
            detail: `A new version download started. The app will be restarted to install the update.`
        };
        dialog.showMessageBox(dialogOpts);

        updateInterval = null;
    });
    autoUpdater.on(`update-downloaded`, (_event, releaseNotes, releaseName) => {
        const dialogOpts = {
            type: `info`,
            buttons: [`Restart`, `Later`],
            title: `Application Update`,
            message: process.platform === `win32` ? releaseNotes : releaseName,
            detail: `A new version has been downloaded. Restart the application to apply the updates.`
        };
        dialog.showMessageBox(dialogOpts).then((returnValue) => {
            if (returnValue.response === 0) autoUpdater.quitAndInstall()
        });
    });

    autoUpdater.on('error', (error) => {
        // Обработайте ошибку, выведите информацию об ошибке в консоль
        const dialogOpts = {
            type: `info`,
            buttons: [`ok`],
            title: `Application Update error`,
            message: process.platform === `win32` ? releaseNotes : releaseName,
            detail:error.message
        };
        dialog.showMessageBox(dialogOpts)
      });
}

function WindowSize() {
    const [x, y] = win.getPosition()

    const width = Math.round((screen.getPrimaryDisplay().size.width * 20) / 100) < 350 ? 350 : Math.round((screen.getPrimaryDisplay().size.width * 20) / 100)
    const height = width
    if (os.platform() !== `darwin`) {
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


    win.setAlwaysOnTop(true, `normal`, `bellow`);
}

app.on(`ready`, createWindow);



app.on(`window-all-closed`, () => {
    if (process.platform !== `darwin`) app.quit()
})
