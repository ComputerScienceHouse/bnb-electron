// Define the shape of your new API
export interface ISerialAPI {
  listPorts: () => Promise<any[]>;
  connect: (path: string) => Promise<void>;
  disconnect: () => Promise<void>;
  sendData: (data: string) => void;
  onSerialData: (callback: (data: string) => void) => void;
  onSerialError: (callback: (error: string) => void) => void;
}

interface ISystemAPI {
  poweroff: () => void
  exit: () => void
}

// Add it to the global window object
declare global {
  interface Window {
    serialApi: ISerialAPI;
    systemApi: ISystemAPI;
  }
}