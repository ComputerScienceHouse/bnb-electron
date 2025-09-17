import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@renderer/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@renderer/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { LockOpen, MonitorX, Power } from 'lucide-react'

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
        <TabsContent value="inventory">Make changes to your account here.</TabsContent>
        <TabsContent value="tare">Change your password here.</TabsContent>
        <TabsContent value="system">System administrative content here.</TabsContent>
      </Tabs>
    </div>
  )
}
