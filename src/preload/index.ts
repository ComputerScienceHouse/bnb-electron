import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { exposeElectronTRPC } from 'electron-trpc/main'

console.log('✅ Preload script is loading...');

process.once('loaded', async () => {
  exposeElectronTRPC();
});
// Custom APIs for renderer
const api = {};

const serialApi = {
  /**
   * Asks the main process for a list of all available serial ports.
   * Uses ipcRenderer.invoke for an async request-response.
   * @returns {Promise<any[]>} A promise that resolves with an array of port info objects.
   */
  listPorts: (): Promise<any[]> => ipcRenderer.invoke('serial:list-ports'),

  /**
   * Asks the main process to connect to a specific serial port.
   * @param {string} path - The path of the port to connect to (e.g., 'COM3' or '/dev/ttyS0').
   * @returns {Promise<void>} A promise that resolves when connected or rejects on error.
   */
  connect: (path: string): Promise<void> => ipcRenderer.invoke('serial:connect', path),

  /**
   * Asks the main process to disconnect from the current serial port.
   * @returns {Promise<void>} A promise that resolves when disconnected.
   */
  disconnect: (): Promise<void> => ipcRenderer.invoke('serial:disconnect'),

  /**
   * Sends data to the main process to be written to the serial port.
   * This is a "fire-and-forget" action.
   * @param {string} data - The data to send.
   */
  sendData: (data: string): void => ipcRenderer.send('serial:send-data', data),

  /**
   * Subscribes to data events coming from the main process.
   * @param {(data: string) => void} callback - The function to call with incoming data.
   */
  onSerialData: (callback: (data: string) => void) => {
    ipcRenderer.on('serial:data', (_event, data) => callback(data));
  },

  /**
   * Subscribes to error events coming from the main process.
   * @param {(error: string) => void} callback - The function to call with an error message.
   */
  onSerialError: (callback: (error: string) => void) => {
    ipcRenderer.on('serial:error', (_event, error) => callback(error));
  }
};

const systemApi = {
  poweroff: () => ipcRenderer.send('system:poweroff'),
  exit: () => ipcRenderer.send('system:exit'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('serialApi', serialApi);
    contextBridge.exposeInMainWorld('systemApi', systemApi);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
