import { AnimatedPage } from '@renderer/components/animated-page'
import checkmark from '../assets/checkmark.svg'
import { useUserStore } from '@renderer/store/userStore'
import { useCountdown } from '@renderer/hooks/useCountdown'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/close-doors')({
  component: CloseDoors
})

function CloseDoors() {
  const name = useUserStore((state) => state.name)
  useCountdown('/receipt', 1)

  return (
    <AnimatedPage>
      <div className="grid h-screen place-items-center">
        <img src={checkmark} alt="Checkmark" className="col-start-1 row-start-1" />
        <div className="col-start-1 row-start-1 flex flex-col items-center gap-y-5">
          <p className="text-5xl font-mono text-center">
            Door closed <br /> transaction complete
          </p>
          <p className="text-lg font-mono text-center">Thank you {name || 'Guest'}!</p>
        </div>
      </div>
    </AnimatedPage>
  )
}
