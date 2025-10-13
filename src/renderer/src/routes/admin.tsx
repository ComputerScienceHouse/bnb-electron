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
import Inventory from './inventory'

export const Route = createFileRoute('/admin')({
  component: Admin
})

function Admin() {
  return (
    <div className="flex flex-row justify-between h-screen pt-1">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory">Iventory</TabsTrigger>
          <TabsTrigger value="tare">Tare</TabsTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TabsTrigger value="system">System</TabsTrigger>
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
        <TabsContent value="inventory"><Inventory/></TabsContent>
        <TabsContent value="tare"><Tare/></TabsContent>
      </Tabs>
    </div>
  )
}
