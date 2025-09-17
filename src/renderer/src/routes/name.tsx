import { AnimatedPage } from '@renderer/components/animated-page'
import { useCountdown } from '@renderer/hooks/useCountdown'
import { useUserStore } from '@renderer/store/userStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/name')({
  component: Name
})

function Name() {
  const name = useUserStore((state) => state.name)
  useCountdown('/cart', 1)

  return (
    <AnimatedPage>
      <div className="flex w-[100vw] h-[100vh]">
        <h1 className="m-auto text-8xl font-mono font-semibold">Welcome {name || 'Guest'}</h1>
      </div>
    </AnimatedPage>
  )
}
