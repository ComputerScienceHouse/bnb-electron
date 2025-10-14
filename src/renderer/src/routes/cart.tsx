import Item from '@renderer/components/item'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { Sidebar } from '@renderer/components/sidebar'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@renderer/components/ui/button'
import { AnimatedPage } from '@renderer/components/animated-page'
import { useCartStore } from '@renderer/store/cartStore'
import { useEffect, useState } from 'react'
import { usePrevious } from '@renderer/hooks/usePrevious'
import { truncate } from 'node:original-fs'

export const Route = createFileRoute('/cart')({
  component: Cart
})

interface SerialData {
  doors: boolean;
  hatch: boolean;
}

function Cart() {
  const items = useCartStore((state) => state.items)
  let isEmpty = items.length === 0
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const navigate = useNavigate()
  const [data, setData] = useState<SerialData>({doors: false, hatch: false});  
  isEmpty = true;
  const previousDoorsState = usePrevious(data.doors)
  
  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on('serial:data', (event, data: SerialData) => {
      console.log('Data recieved in frontend: ', data);
      if(data) {
        setData(data)
      }
    });

    return () => {
      removeListener();
    }
  }, [])

  useEffect(() => {
    if (previousDoorsState === false && data.doors === true) {
      navigate({ to: '/close-doors' });
    }
  }, [data, previousDoorsState]);

  return (
    <AnimatedPage>
      <div className="flex flex-row justify-between h-screen">
        <div className="flex flex-col gap-5 m-3 w-[70%]">
          <div className="flex flex-row gap-x-2 items-center">
            <h1 className="text-5xl font-mono font-semibold left">Cart</h1>
            <Button variant="outline" onClick={() => navigate({ to: '/close-doors' })}>
              Next
            </Button>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-mono text-2xl">Your cart</p>
            {isEmpty ? null : <p className="font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>}
          </div>
          {isEmpty ? (
            <>
              <p>Current Door Status: {data?.doors ? 'Closed' : 'Open'}</p>
              <p className="flex text-center text-3xl mx-auto my-28">
                Welcome [Y/N] <br />
                Your cart is empty, please grab your snacks
                <br />
                from the cabinet to start.
                <br />
                We’ll do the rest
              </p>
            </>
          ) : (
            <ScrollArea className="flex-1 overflow-auto">
              <div className="flex gap-5 flex-col items-center">
                {items.map((item, i) => (
                  <Item variant="cart" key={i} {...item}></Item>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        <Sidebar variant="cart"></Sidebar>
      </div>
    </AnimatedPage>
  )
}
