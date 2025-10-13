import { AnimatedPage } from '@renderer/components/animated-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory')({
  component: Inventory,
})

export default function Inventory() {
  return (
     <AnimatedPage>
        <div>
            Hello "/inventory"!
        </div>
    </AnimatedPage>
  )
     
}
