const { app, BrowserWindow, webContents } = require('electron');
const path = require('path');


let mainWindow; 

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, './img/logo.ico'),
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // },
        // fullscreen: true, // Define a janela para tela cheia
        // fullscreenable: true, // Permite que a janela seja colocada em tela cheia
        autoHideMenuBar: true, // Oculta a barra de menu
        // frame: false, // Remove a moldura da janela
        useContentSize: true // Pode ser útil para evitar que a janela se sobreponha à barra de tarefas, mas experimente com e sem esta opção
        
    });

    mainWindow.loadFile('index.html');
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

// Defina a barra de menu
// const template = [
//     {
//         label: 'Menu',
//         submenu: [
//             {
//                 label: 'Home',
//                 click() {
//                     // Carrega a página Home
//                     mainWindow.loadFile('home.html');
//                 }
//             },
//             {
//                 label: 'About',
//                 click() {
//                     // Carrega a página About
//                     mainWindow.loadFile('about.html');
//                 }
//             },
//             {
//                 label: 'Contact',
//                 click() {
//                     // Carrega a página Contact
//                     mainWindow.loadFile('contact.html');
//                 }
//             },
//             { type: 'separator' },
//             {
//                 label: 'Exit',
//                 accelerator: 'CmdOrCtrl+Q',
//                 click() {
//                     app.quit();
//                 }
//             }
//         ]
//     }
// ];