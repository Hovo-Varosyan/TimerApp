const path = require(`path`);
const url = require(`url`);
const { app, BrowserWindow, screen, globalShortcut, dialog } = require(`electron`);
let os = require(`os`)
const { autoUpdater } = require(`electron-updater`)

let win;

function createWindow() {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;


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
    win.webContents.openDevTools()
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
    autoUpdater.on(`update-available`, (_event) => {

        const dialogOpts = {
            type: `info`,
            buttons: [`Ok`],
            title: `Update Available`,
            message: "messages",
            detail: `A new version download started. The app will be restarted to install the update.`
        };


        dialog.showMessageBoxSync(dialogOpts);

    });

    autoUpdater.on(`update-downloaded`, (_event) => {
        const dialogOpts = {
            type: `info`,
            buttons: [`Restart`, `Later`],
            title: `Application Update`,
            message: "messages",
            detail: `A new version has been downloaded. Restart the application to apply the updates.`
        };


        dialog.showMessageBoxSync(dialogOpts).then((returnValue) => {
            if (returnValue.response === 0) autoUpdater.quitAndInstall()
        });
    });
    autoUpdater.on('download-progress', (progressObj) => {
        const { bytesPerSecond, percent, transferred, total } = progressObj;
        
        const message = `Загрузка: ${percent}% (${transferred}/${total} байт, ${bytesPerSecond} байт/сек)`;
        
        dialog.showMessageBox({
            type: 'info',
            buttons: [],
            title: 'Прогресс загрузки',
            message
        });
        
    });
    autoUpdater.on('update-not-available', () => {
        const dialogOpts = {
            type: `info`,
            buttons: [`ok`],
            title: `Application Update error`,
            message: 'not new verssion'
        }

        dialog.showMessageBoxSync(dialogOpts)
    })

    autoUpdater.on('error', (error) => {

        const dialogOpts = {
            type: `error`,
            buttons: [`ok`],
            title: `Application Update error`,
            message: error.message,
            detail: error.stack || ''
        };


        dialog.showMessageBoxSync(dialogOpts)
    });

    win.on(`closed`, () => {
        win = null;
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
        if (x < 45) {
            x = 45
        }
        if (y < 45) {
            y = 45
        }
        win.setBounds({ x, y, width, height })
    }


    win.setAlwaysOnTop(true, `normal`, `bellow`);
}

app.on(`ready`, async () => {

    createWindow()
    try {
        autoUpdater.autoDownload = false;
        autoUpdater.allowPrerelease = true;
        autoUpdater.devMode = true;
        await autoUpdater.checkForUpdates()

    } catch (e) {
        dialog.showMessageBoxSync(e)
    }


});



app.on(`window-all-closed`, () => {
    if (process.platform !== `darwin`) app.quit()
})
