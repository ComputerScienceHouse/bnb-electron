import { AnimatedPage } from '@renderer/components/animated-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tare')({
  component: Tare
})

export default function Tare() {

  const slots = [
    {
      shelf_id: "11:DB:BB:2F:ED:DD",
			slot_id: 1,
			weight_g: 100,
    },
    {
      shelf_id: "11:DB:BB:2F:ED:DD",
			slot_id: 2,
			weight_g: 100,
    },
    {
      shelf_id: "11:DB:BB:2F:ED:DD",
			slot_id: 3,
			weight_g: 100,
    },
    {
      shelf_id: "11:DB:BB:2F:ED:DD",
			slot_id: 4,
			weight_g: 100,
    },
    {
      shelf_id: "11:DB:BB:2F:ED:DD",
			slot_id: 1,
			weight_g: 100,
    },
    {
      shelf_id: "11:DB:BB:2F:ED:DD",
			slot_id: 2,
			weight_g: 100,
    },
  ]

  return (
    <AnimatedPage>
      {slots.map(slot => (
        <div className='bg-black text-orange'>
          {slot.slot_id}
        </div>
      ))}
    </AnimatedPage>
  )
}
