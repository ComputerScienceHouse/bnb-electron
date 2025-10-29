import { AnimatedPage } from '@renderer/components/animated-page'
import { Button } from '@renderer/components/ui/button'
import useSystemCommands from '@renderer/hooks/useSystemCommands'
import { createFileRoute } from '@tanstack/react-router'
import { LockOpen, MonitorX, Power } from 'lucide-react'

export const Route = createFileRoute('/system')({
  component: System,
})


export default function System() {
  const { openHatch, openDoors, exit, poweroff } = useSystemCommands()

  return (
        <AnimatedPage>
          <div className="data-[state=active]:bg-background w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)] p-4">
            <div className="grid grid-cols-2 grid-rows-2 gap-10 w-full h-full">
                <Button className="w-80 h-40 m-auto rounded-4xl text-3xl bg-secondary" onClick={openHatch}>
                    <LockOpen className='size-8'/> Open Hatch
                </Button>
                <Button className="w-80 h-40 m-auto rounded-4xl text-3xl bg-primary" onClick={openDoors}>
                    <LockOpen className='size-8'/> Open Doors
                </Button>
                <Button className="w-80 h-40 m-auto rounded-4xl text-3xl bg-destructive" onClick={exit}>
                    <MonitorX className='size-8'/> Exit App
                </Button>
                <Button className="w-80 h-40 m-auto rounded-4xl text-3xl bg-destructive" onClick={poweroff}>
                    <Power className='size-8'/> Power Off
                </Button>
            </div>
          </div>
        </AnimatedPage>
  )
}
