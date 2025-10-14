// import { SerialPort } from "serialport";
// import type { BrowserWindow } from 'electron'

// const UART_PORT_PATH = '/dev/ttyS0'; // Example path, change if needed

// const port = new SerialPort({
//   path: UART_PORT_PATH,
//   baudRate: 115200,
//   autoOpen: false,
// });

// /**
//  * Lists all available serial ports to help with debugging and selection.
//  */
// export function listPorts(): Promise<any[]> {
//   return SerialPort.list();
// }

// /**
//  * Opens the serial port and resolves a promise when it's ready.
//  * @returns {Promise<void>}
//  */
// export function connect(window: BrowserWindow) {
//   console.log('Attempting to open port...');
//   return new Promise<void>((resolve, reject) => {
//     port.open((err) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve();
//     });
//   });
// }

// /**
//  * Closes the serial port.
//  * @returns {Promise<void>}
//  */
// export function disconnect() {
//     if (!port.isOpen) {
//         return Promise.resolve(); // Already closed
//     }
//     console.log('Closing port...');
//     return new Promise<void>((resolve, reject) => {
//         port.close((err) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve();
//         });
//     });
// }

// /**
//  * Sends a message over an already open serial port.
//  * Returns a Promise that resolves when the write is complete or rejects on error.
//  * @param {string} message The message to send.
//  * @returns {Promise<void>}
//  */
// export function sendMessage(message) {
//  return new Promise<void>((resolve, reject) => {
//     if(!port.isOpen){
//       return reject(new Error('Port is not open. Cannot send message.'));
//     }
//     console.log(`Sending: "${message}`);

//     port.write(message, (err) => {
//       if(err) return reject(err);
//       resolve();
//     });
//  });
// }

// /**
//  * Waits for the next 'data' event from the serial port.
//  * @returns {Promise<Buffer>} A promise that resolves with the received data Buffer.
//  */
// export function receiveMessage() {
//   return new Promise((resolve, reject) => {
//     // 1. Define handler functions
//     const dataHandler = (data) => {
//       console.log(`Receiving: "${data.toString()}"`);
//       // Clean up the other listener
//       port.removeListener('error', errorHandler);
//       // Resolve the promise with the received data
//       resolve(data);
//     };

//     const errorHandler = (err) => {
//       // Clean up the other listener
//       port.removeListener('data', dataHandler);
//       // Reject the promise if an error occurs
//       reject(err);
//     };

//     // 2. Attach one-time listeners
//     // Using .once() ensures they are automatically removed after firing,
//     // preventing memory leaks.
//     port.once('data', dataHandler);
//     port.once('error', errorHandler);
//   });
// }
// // /**
// //  * Main function to run the serial port operations.
// //  */
// // async function main() {
// //   // It's good practice to list ports first to see what's available
// //   await listPorts();

// //   console.log(`\nAttempting to open port: ${UART_PORT_PATH}`);

// //   port.on('open', () => {
// //     console.log('Port opened successfully.');
// //     port.write('Hello from Node.js!', (err) => {
// //       if (err) {
// //         return console.error('Error on write:', err.message);
// //       }
// //       console.log('Message written.');
// //     });
// //   });

// //   port.on('error', (err) => {
// //     console.error('Error:', err.message);
// //     if (err.message.includes('Permission denied')) {
// //         console.error('---');
// //         console.error('PERMISSION ERROR: Try running "sudo usermod -a -G dialout $USER"');
// //         console.error('You will need to log out and log back in for this to take effect.');
// //         console.error('---');
// //     }
// //   });

// //   // Now, try to open the port
// //   port.open((err) => {
// //     if (err) {
// //       console.error(`Failed to open port ${UART_PORT_PATH}:`, err.message);
// //     }
// //   });
// // }

// // // Run the main function
// // main();


// src/main/uart.ts

import { SerialPort } from 'serialport'
import type { BrowserWindow } from 'electron'

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
  port = new SerialPort({ path, baudRate: 115200, autoOpen: false });

  // Forward all incoming data to the renderer process
  port.on('data', (data: Buffer) => {
    window.webContents.send('serial:data', data.toString());
  });

  port.on('error', (err) => {
    console.error('Serial Port Error:', err.message);
    // Optionally, forward the error to the renderer as well
    window.webContents.send('serial:error', err.message);
  });

  port.on('data', (data: Buffer) => {
    console.log(`[Main Process] RAW DATA RECEIVED: ${data.toString()}`);
    window.webContents.send('serial:data', data.toString());
  })

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