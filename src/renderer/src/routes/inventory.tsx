import { AnimatedPage } from '@renderer/components/animated-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory')({
  component: Inventory,
})

export default function Inventory() {
  return (
     <AnimatedPage>
        <div className="data-[state=active]:bg-background w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)] p-4 text-4xl text-center">
            The inventory will be here, coming soon!
        </div>
    </AnimatedPage>
  )
     
}
