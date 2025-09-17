import { createFileRoute } from '@tanstack/react-router'
import { AnimatedPage } from '@renderer/components/animated-page'
import Item from '@renderer/components/item'
import { Sidebar } from '@renderer/components/sidebar'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { Separator } from '@renderer/components/ui/separator'
import { useCountdown } from '@renderer/hooks/useCountdown'
import { useCartStore } from '@renderer/store/cartStore'
import { CreditCard } from 'lucide-react'

export const Route = createFileRoute('/receipt')({
  component: Receipt
})

function Receipt() {
  const items = useCartStore((state) => state.items)
  return (
    <AnimatedPage>
      <div className="flex flex-col h-screen justify-evenly">
        <div className="flex flex-row gap-x-0.5 items-center justify-between text-center">
          <h1 className="ml-4 text-2xl font-mono font-semibold left">Total</h1>
          <TimeOut />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row gap-x-10 m-3 w-[70%] bg-primary rounded-xl p-5 ">
            <ScrollArea className="flex-1 overflow-auto">
              <div className="flex gap-5 flex-col items-center">
                {items.map((item, i) => (
                  <Item variant="receipt" key={i} {...item}></Item>
                ))}
              </div>
            </ScrollArea>
            <div className="w-1/3 flex flex-col justify-between">
              <p className="text-sm">
                If you have added an email and phone number your receipt will be sent to you.
              </p>
              <div>
                <div className="pb-4 text-2xl">
                  <div className="flex flex-row gap-x-2 justify-between">
                    <p>Subtotal:</p>
                    <p>$0.00</p>
                  </div>
                  <div className="flex flex-row gap-x-2 justify-between">
                    <p>Taxes:</p>
                    <p>$0.00</p>
                  </div>
                </div>
                <Separator className="bg-foreground mb-2" />
                <div className="flex flex-row gap-x-2 justify-between font-bold pb-5 text-3xl">
                  <p>Total:</p>
                  <p>$0.00</p>
                </div>
                <div className="text-md">
                  <p>Payment Method:</p>
                  <div className="flex flex-row gap-x-2">
                    <CreditCard className="size-5" />
                    Dining Dollars
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Sidebar variant="receipt"></Sidebar>
        </div>
      </div>
    </AnimatedPage>
  )
}

function TimeOut() {
  const countdown = useCountdown('/', 20)

  return (
    <p className="pr-4 text-xl">
      Time out in: <span className="font-bold">{countdown}</span>
    </p>
  )
}
