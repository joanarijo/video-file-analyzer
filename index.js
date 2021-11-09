const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    console.log('App is ready!');
    mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true , contextIsolation: false } });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('videosubmit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
       mainWindow.webContents.send('videometadata', metadata.format.duration);
    });
});