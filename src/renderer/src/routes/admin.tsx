import { Tabs, TabsList, TabsTrigger, TabsContent } from '@renderer/components/ui/tabs'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Tare from './tare'
import System from './system'
import Inventory from './inventory'
import { ArrowLeft } from 'lucide-react';
import { Button } from '@renderer/components/ui/button'

export const Route = createFileRoute('/admin')({
  component: Admin
})

function Admin() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between h-screen">
      <Tabs defaultValue="account" className="w-40 h-10">
        <TabsList>
          <TabsTrigger value="inventory" className='w-40 h-10 text-xl'>Inventory</TabsTrigger>
          <TabsTrigger value="tare" className='w-40 h-10 text-xl'>Tare</TabsTrigger>
          <TabsTrigger value="system" className='w-40 h-10 text-xl'>System</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory"><Inventory/></TabsContent>
        <TabsContent value="tare"><Tare/></TabsContent>
        <TabsContent value="system"><System/></TabsContent>
      </Tabs>
      <Button className="bg-secondary size-15 rounded-full m-2" onClick={() => navigate({ to: '/' })}>
        <ArrowLeft className='size-8'/>
      </Button>
    </div>
  )
}
