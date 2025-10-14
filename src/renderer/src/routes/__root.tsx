import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AnimatedPage } from '@renderer/components/animated-page'
import { useSerialConnection } from '@renderer/lib/useSerialConnection'
import '@renderer/assets/global.css'
import { useEffect, useState } from 'react';

function RootComponent() {
  const { isConnected, error } = useSerialConnection();

  return (
    <AnimatedPage>
      <Outlet />
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.7 }}>
        {isConnected ? '🟢 Connected' : `🔴 Disconnected: ${error || ''}`}  
      </div>
    </AnimatedPage>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})
