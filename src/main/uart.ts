import { SerialPort } from 'serialport'
import type { BrowserWindow } from 'electron'
import { JsonStreamParser } from './json-stream-parser'
// This will hold the single, managed instance of our serial port.
let port: SerialPort | null = null;

/**
 * Lists all available serial ports.
 */
export function listPorts(): Promise<any[]> {
  return SerialPort.list();
}

/**
 * Connects to a specific serial port and starts listening for data.
 * All incoming data will be forwarded to the provided browser window.
 * @param window The BrowserWindow to send 'serial:data' events to.
 * @param path The system path of the port to connect to (e.g., 'COM3' or '/dev/ttyS0').
 */
export async function connect(window: BrowserWindow, path: string): Promise<void> {
  if (port?.isOpen) {
    console.log('A port is already open. Disconnect first.');
    return;
  }

  console.log(`Attempting to open port: ${path}`);
  port = new SerialPort({ path, baudRate: 115200, autoOpen: false, lock: false});

  // Forward all incoming data to the renderer process
  port.on('data', (data: Buffer) => {
    window.webContents.send('serial:data', data.toString());
  });

  port.on('error', (err) => {
    console.error('Serial Port Error:', err.message);
    // Optionally, forward the error to the renderer as well
    window.webContents.send('serial:error', err.message);
  });

  const parser = new JsonStreamParser();

  port.on('data', (data: Buffer) => {
    const completeObjects = parser.push(data.toString());

    for (const jsonObject of completeObjects) {
      console.log(`[Main Process] PARSED OBJECT SENT:`, jsonObject);
      window.webContents.send('serial:data', jsonObject);
  }
  });

  // Return a promise that resolves when the port is open
  return new Promise((resolve, reject) => {
    port?.open((err) => {
      if (err) {
        console.error(`Failed to open port ${path}:`, err.message);
        port = null; // Clear the port instance on failure
        return reject(err);
      }
      console.log(`Port ${path} opened successfully.`);
      resolve();
    });
  });
}

/**
 * Closes the currently connected serial port.
 */
export function disconnect(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!port || !port.isOpen) {
      console.log('No port is currently open.');
      return resolve();
    }

    console.log('Closing port...');
    port.close((err) => {
      if (err) {
        return reject(err);
      }
      port = null; // Clear the instance
      console.log('Port closed.');
      resolve();
    });
  });
}

/**
 * Sends a message to the open serial port.
 * @param data The string data to send.
 */
export function sendData(data: string): void {
  if (!port || !port.isOpen) {
    console.warn('Cannot send data: Port is not open.');
    return;
  }

  port.write(data, (err) => {
    if (err) {
      console.error('Error writing to port:', err.message);
    }
  });
}