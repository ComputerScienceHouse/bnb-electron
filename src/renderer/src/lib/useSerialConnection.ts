import { useState, useEffect } from 'react';

/**
 * A custom hook to manage the lifecycle of a serial port connection.
 * It automatically finds and connects to a port on mount and disconnects on unmount.
 * @returns An object with the connection status.
 */
export function useSerialConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let portPath = ''; // Keep track of the port we connected to

    const setupSerial = async () => {
      try {
        setError(null); // Clear previous errors
        const ports = await window.serialApi.listPorts();
        
        if (ports.length === 0) {
          throw new Error('No serial ports found. Please connect a device.');
        }
        ports.forEach(port => {
            console.log(port.path)
        });
        
        // Use the first available port
        portPath = '/dev/tty.usbmodem101';
        
        await window.serialApi.connect(portPath);
        setIsConnected(true);
        console.log(`✅ Successfully connected to serial port: ${portPath}`);

      } catch (err: any) {
        console.error('Failed to connect to serial port:', err);
        setError(err.message);
        setIsConnected(false);
      }
    };

    setupSerial();

    // The cleanup function that runs when the component using this hook unmounts
    return () => {
      if (portPath) {
        console.log('Disconnecting from serial port...');
        window.serialApi.disconnect();
        setIsConnected(false);
      }
    };
  }, []); // The empty array [] ensures this effect runs only once

  // Return the state for the component to use
  return { isConnected, error };
}