import { useState } from 'react'
import { Button } from '@renderer/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@renderer/components/ui/dialog'
import { Sheet, SheetContent } from '@renderer/components/ui/sheet'
import { cn } from '@renderer/lib/utils'
import { Keyboard } from './keyboard'
import { Input } from '@renderer/components/ui/input'

export const EditContactButton = () => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({ email: '', phone: '' })
  const [activeInput, setActiveInput] = useState<string | null>(null)

  const handleKeyPress = (key: string) => {
    if (!activeInput) return
    const currentValue = inputs[activeInput] || ''
    let newValue = currentValue

    if (key === 'Backspace') {
      newValue = currentValue.slice(0, -1)
    } else if (key === 'Space') {
      newValue = currentValue + ' '
    } else {
      newValue = currentValue + key
    }
    setInputs((prev) => ({ ...prev, [activeInput]: newValue }))
  }

  return (
    <>
      <Dialog onOpenChange={(isOpen) => !isOpen && setActiveInput(null)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-xl dark:bg-transparent dark:hover:bg-transparent dark:border-secondary border-2 px-[4.25rem] text-sm"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'transition-all duration-300 ease-in-out',
            // Reduced the upward movement for a more subtle animation
            activeInput ? 'top-[calc(50%-100px)]' : 'top-[50%]'
          )}
        >
          <DialogHeader>
            <DialogTitle>Edit your contact</DialogTitle>
            <DialogDescription>
              Please provide a phone number or email to receive a receipt of this transaction
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4">
            <Input
              id="email"
              placeholder="Email"
              onFocus={() => setActiveInput('email')}
              value={inputs.email}
              onChange={(e) => setInputs((prev) => ({ ...prev, email: e.target.value }))}
            />
            <Input
              id="phone"
              placeholder="Phone Number"
              onFocus={() => setActiveInput('phone')}
              value={inputs.phone}
              onChange={(e) => setInputs((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <DialogFooter className="flex flex-row gap-x-2">
            <DialogClose asChild>
              <Button variant="default" className="w-1/2">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline" className="w-1/2">
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={!!activeInput} onOpenChange={(open) => !open && setActiveInput(null)}>
        <SheetContent side="bottom" className=" p-0 border-t-0 bg-transparent">
          <Keyboard onKeyPress={handleKeyPress} />
        </SheetContent>
      </Sheet>
    </>
  )
}
