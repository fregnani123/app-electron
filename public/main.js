const { app, BrowserWindow, Menu, screen } = require('electron');
const path = require('path');
const { EventEmitter } = require('events');

let mainWindow = null;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const taskbarHeight = screen.getPrimaryDisplay().workAreaSize.height - screen.getPrimaryDisplay().bounds.height;

    mainWindow = new BrowserWindow({
        width: width,
        height: height - taskbarHeight,
        x: 0,
        y: 0,
        icon: path.join(__dirname, '../img/menu-aberto.png'),
        autoHideMenuBar: true,
        useContentSize: true,
        maximizable: true
    });

    mainWindow.loadFile('./public/index.html');
    mainWindow.maximize();

    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal('https://electronjs.org');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
        webContents.setMaxListeners(20); // Define the number of listeners you need
    });
    // Add a keyboard shortcut to open DevTools
    mainWindow.webContents.on('did-frame-finish-load', () => {
        mainWindow.webContents.on('before-input-event', (event, input) => {
            if (input.control && input.shift && input.key === 'I') {
                mainWindow.webContents.openDevTools();
            }
        });
    });
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

EventEmitter.defaultMaxListeners = 20;
