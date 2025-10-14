import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@renderer/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@renderer/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { LockOpen, MonitorX, Power } from 'lucide-react'
import Tare from './tare'
import useSystemCommands from '@renderer/hooks/useSystemCommands'
// import Tare from './tare'
// import Inventory from './inventory'

export const Route = createFileRoute('/admin')({
  component: Admin
})


function Admin() {

  const { openHatch, openDoors, exit, poweroff } = useSystemCommands()

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
              <DropdownMenuItem onClick={openHatch}>
                <LockOpen />
                Open Hatch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openDoors}>
                <LockOpen />
                Open Doors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exit}>
                <MonitorX />
                Exit App
              </DropdownMenuItem>
              <DropdownMenuItem onClick={poweroff}>
                <Power />
                Power off
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsList>
        <TabsContent value="inventory">Make changes to your account here.</TabsContent>
        <TabsContent value="tare"><Tare/></TabsContent>
        <TabsContent value="system">System administrative content here.</TabsContent>
      </Tabs>
    </div>
  )
}
