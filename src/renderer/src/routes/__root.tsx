import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AnimatedPage } from '@renderer/components/animated-page'
import '@renderer/assets/global.css'

function RootComponent() {
  return (
    <AnimatedPage>
      <Outlet />
    </AnimatedPage>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})
