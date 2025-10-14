import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AnimatedPage } from '@renderer/components/animated-page'
import { useSerialConnection } from '@renderer/lib/useSerialConnection'
import '@renderer/assets/global.css'
import { useEffect, useState } from 'react';

function RootComponent() {
  const { isConnected, error } = useSerialConnection();
  const [serialLog, setSerialLog] = useState<string[]>([]);

  useEffect(() => {
    window.serialApi.onSerialData((data: string) => {
      // This state update puts the message on the screen.
      setSerialLog(prevLog => [...prevLog, data.trim()]);
    });
  }, []);

  return (
    <AnimatedPage>
      <Outlet />
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.7 }}>
        {isConnected ? '🟢 Connected' : `🔴 Disconnected: ${error || ''}`}
        <h3>Serial Log</h3>
        <pre>
          {serialLog.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </pre>
      </div>
    </AnimatedPage>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})
