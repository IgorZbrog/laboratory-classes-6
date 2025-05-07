const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const http = require('http');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });

  const checkServer = () => {
    http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        mainWindow.loadURL('http://localhost:3000');
      } else {
        setTimeout(checkServer, 1000);
      }
    }).on('error', () => setTimeout(checkServer, 1000));
  };

  exec('npm start', (err) => {
    if (err) console.error('Błąd uruchamiania backendu:', err);
  });

  checkServer();
}

app.whenReady().then(createWindow);
