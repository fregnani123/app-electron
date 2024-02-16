const { app, BrowserWindow, webContents } = require('electron');
const path = require('path');
const { EventEmitter } = require('events');

let mainWindow; 

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, '../img/menu-aberto.png'),
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // },
        autoHideMenuBar: true, // Oculta a barra de menu
        useContentSize: true // Pode ser útil para evitar que a janela se sobreponha à barra de tarefas, mas experimente com e sem esta opção.
    });

    mainWindow.loadFile('./public/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
        webContents.setMaxListeners(20); // Defina o número de ouvintes que você precisa
    });
    // Adicione um atalho de teclado para abrir as DevTools
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

EventEmitter.defaultMaxListeners = 15;
