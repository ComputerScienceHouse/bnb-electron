import { AnimatedPage } from '@renderer/components/animated-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tare')({
  component: Tare
})

export function Tare() {
  return (
    <AnimatedPage>
      <></>
    </AnimatedPage>
  )
}
