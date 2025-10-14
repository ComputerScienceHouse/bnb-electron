import { AnimatedPage } from '@renderer/components/animated-page'
import { Button } from '@renderer/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tare')({
  component: Tare
})

interface TareButtonProps {
  slot: string,
  className?: string
}

function Slot({slot, className}: TareButtonProps) {
  return (
    <Button className={className}>
      {slot}
    </Button>
  )
}
const tare_buttons = {
    "shelf_1": [
      "slot_1",
      "slot_2",
      "slot_3",
      "slot_4"
    ],
    "shelf_2": [
      "slot_1",
      "slot_2",
      "slot_3",
      "slot_4"
    ],
    "shelf_3": [
      "slot_1",
      "slot_2",
      "slot_3",
      "slot_4"
    ],
    "shelf_4": [
      "slot_1",
      "slot_2",
      "slot_3",
      "slot_4"
    ]

  }

export default function Tare() {
  const shelves = Object.keys(tare_buttons)
  const leftShelves = shelves.filter((_, index) => index % 2 == 0)
  const rightShelves = shelves.filter((_, index) => index % 2 == 1)

  return (
    <AnimatedPage>
      <div className="data-[state=active]:bg-background w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)] p-4">
        {/* Main container for the two columns */}
        <div className="flex h-full w-full gap-12">
          {/* Left Column */}
          <div className="flex flex-1 flex-col gap-4">
            {leftShelves.map((shelf) => (
              <div key={shelf} className='flex-1 flex flex-col'>
                <h3 className="text-lg capitalize font-semibold mb-2">{shelf.replace('_', ' ')}</h3>
                <div className="flex flex-1 gap-2">
                  {tare_buttons[shelf].map((slot) => (
                    <Slot key={`${shelf}-${slot}`} slot={slot} className="size-1/4 h-full bg-white/20 hover:bg-white/30 focus:bg-green-600 active:bg-green-600 backdrop-blur-lg rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-1 flex-col gap-4">
            {rightShelves.map((shelf) => (
              <div key={shelf} className='flex flex-1 flex-col'>
                <h3 className="text-lg capitalize font-semibold mb-2">{shelf.replace('_', ' ')}</h3>
                <div className="flex flex-1 gap-2">
                  {tare_buttons[shelf].map((slot) => (
                    <Slot key={`${shelf}-${slot}`} slot={slot} className="size-1/4 h-full bg-white/20 hover:bg-white/30 focus:bg-green-600 active:bg-green-600 backdrop-blur-lg rounded-xl"/>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
