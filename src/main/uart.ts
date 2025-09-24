import { SerialPort } from "serialport";

const port = new SerialPort({ path: "COM3", baudRate: 115200 });
