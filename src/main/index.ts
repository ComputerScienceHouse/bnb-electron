import { app, shell, BrowserWindow, ipcMain, globalShortcut, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createIPCHandler } from 'electron-trpc/main'
import { router } from '../main/api'
import { SerialPort } from 'serialport'
import * as uart from './uart'
import {exec} from 'child_process'

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#292929',
    ...(process.platform === 'linux' ? { icon, fullscreen: true } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: false,
    resizable: true
  })

  createIPCHandler({ router, windows: [mainWindow] })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.whenReady().then(() => {
  app.commandLine.appendSwitch('use-angle', 'gl')
  globalShortcut.register('CommandOrControl+K', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) {
      focusedWindow.webContents.openDevTools()
    }
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate([]))
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle('serial:connect', async (_event) => {
  return uart.connect(mainWindow, '/dev/ttyS0');
});

ipcMain.handle('serial:disconnect', () => {
  return uart.disconnect();
});

ipcMain.on('serial:send-data', (_event, data: string) => {
  uart.sendData(data);
});

ipcMain.handle('serial:list-ports', async () => {
  return uart.listPorts();
});

ipcMain.on('system:poweroff', async () => {
  exec('sudo poweroff', (error) => { 
    if(error) {
      console.log(`Failed to power off: ${error}`);
      return
    }
  console.log('Shutdown command issued');
  }) 
})

ipcMain.on('system:exit', async () => {
  app.quit();
})