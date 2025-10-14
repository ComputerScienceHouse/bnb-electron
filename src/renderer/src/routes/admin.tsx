import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@renderer/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@renderer/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { LockOpen, MonitorX, Power } from 'lucide-react'
// import Tare from './tare'
// import Inventory from './inventory'

export const Route = createFileRoute('/admin')({
  component: Admin
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
    ]
  }

function Admin() {

  return (
    <div className="flex flex-row justify-between h-screen pt-1">
      <Tabs defaultValue="account" className="w-40 h-10">
        <TabsList>
          <TabsTrigger value="inventory" className='w-40 h-10 text-xl'>Inventory</TabsTrigger>
          <TabsTrigger value="tare" className='w-40 h-10 text-xl'>Tare</TabsTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TabsTrigger value="system" className='w-40 h-10 text-xl'>System</TabsTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <LockOpen />
                Open Hatch
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LockOpen />
                Open Doors
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MonitorX />
                Exit App
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Power />
                Power off
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsList>
        <TabsContent value="inventory">Make changes to your account here.</TabsContent>
        <TabsContent value="tare" className='data-[state=active]:bg-background w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)] pl-4 '>
          {
            Object.keys(tare_buttons).map((shelf) => (
              <div key={shelf} className="mb-4">
                <h3 className="text-lg capitalize font-semibold mb-2">{shelf.replace('_', ' ')}</h3>
                <div className="flex gap-2">
                  {
                    // Changed forEach to map and added a unique key
                    tare_buttons[shelf].map((slot) => (
                      <Slot key={`${shelf}-${slot}`} slot={slot} className='size-1/4'/>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </TabsContent>
        <TabsContent value="system">System administrative content here.</TabsContent>
      </Tabs>
    </div>
  )
}
