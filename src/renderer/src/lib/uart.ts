import { SerialPort } from "serialport";

const UART_PORT_PATH = '/dev/ttyS0'; // Example path, change if needed

const port = new SerialPort({
  path: UART_PORT_PATH,
  baudRate: 115200,
  autoOpen: false,
});

/**
 * Lists all available serial ports to help with debugging and selection.
 */
export async function listPorts() {
  try {
    const ports = await SerialPort.list();
    console.log('Available serial ports:');
    if (ports.length === 0) {
      console.log('No serial ports found. Make sure your device is connected.');
    } else {
      console.table(ports);
    }
  } catch (err) {
    console.error('Error listing serial ports:', err);
  }
}

/**
 * Opens the serial port and resolves a promise when it's ready.
 * @returns {Promise<void>}
 */
export function connect() {
  console.log('Attempting to open port...');
  return new Promise<void>((resolve, reject) => {
    port.open((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * Closes the serial port.
 * @returns {Promise<void>}
 */
export function disconnect() {
    if (!port.isOpen) {
        return Promise.resolve(); // Already closed
    }
    console.log('Closing port...');
    return new Promise<void>((resolve, reject) => {
        port.close((err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

/**
 * Sends a message over an already open serial port.
 * Returns a Promise that resolves when the write is complete or rejects on error.
 * @param {string} message The message to send.
 * @returns {Promise<void>}
 */
export function sendMessage(message) {
 return new Promise<void>((resolve, reject) => {
    if(!port.isOpen){
      return reject(new Error('Port is not open. Cannot send message.'));
    }
    console.log(`Sending: "${message}`);

    port.write(message, (err) => {
      if(err) return reject(err);
      resolve();
    });
 });
}

/**
 * Waits for the next 'data' event from the serial port.
 * @returns {Promise<Buffer>} A promise that resolves with the received data Buffer.
 */
export function receiveMessage() {
  return new Promise((resolve, reject) => {
    // 1. Define handler functions
    const dataHandler = (data) => {
      console.log(`Receiving: "${data.toString()}"`);
      // Clean up the other listener
      port.removeListener('error', errorHandler);
      // Resolve the promise with the received data
      resolve(data);
    };

    const errorHandler = (err) => {
      // Clean up the other listener
      port.removeListener('data', dataHandler);
      // Reject the promise if an error occurs
      reject(err);
    };

    // 2. Attach one-time listeners
    // Using .once() ensures they are automatically removed after firing,
    // preventing memory leaks.
    port.once('data', dataHandler);
    port.once('error', errorHandler);
  });
}
// /**
//  * Main function to run the serial port operations.
//  */
// async function main() {
//   // It's good practice to list ports first to see what's available
//   await listPorts();

//   console.log(`\nAttempting to open port: ${UART_PORT_PATH}`);

//   port.on('open', () => {
//     console.log('Port opened successfully.');
//     port.write('Hello from Node.js!', (err) => {
//       if (err) {
//         return console.error('Error on write:', err.message);
//       }
//       console.log('Message written.');
//     });
//   });

//   port.on('error', (err) => {
//     console.error('Error:', err.message);
//     if (err.message.includes('Permission denied')) {
//         console.error('---');
//         console.error('PERMISSION ERROR: Try running "sudo usermod -a -G dialout $USER"');
//         console.error('You will need to log out and log back in for this to take effect.');
//         console.error('---');
//     }
//   });

//   // Now, try to open the port
//   port.open((err) => {
//     if (err) {
//       console.error(`Failed to open port ${UART_PORT_PATH}:`, err.message);
//     }
//   });
// }

// // Run the main function
// main();
