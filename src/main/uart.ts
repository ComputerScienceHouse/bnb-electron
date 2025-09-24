import { SerialPort } from "serialport";

const UART_PORT_1 = 'dev/tty0'
const UART_PORT_2 = 'dev/ttyAMA1'

const port = new SerialPort({ path: UART_PORT_1, baudRate: 115200 });

port.write('Hello from Electron!', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
});

port.on('error', function(err) {
  console.log('Error: ', err.message)
})