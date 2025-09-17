import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@renderer/components/ui/dialog'
import { Sheet, SheetContent } from '@renderer/components/ui/sheet'
import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
// import { trpc } from '@renderer/lib/trpc'
import { Keyboard } from './keyboard' // Assuming Keyboard is in a separate file
import { cn } from '@renderer/lib/utils'

export const AdminAccess = ({ children }: { children: React.ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeInput, setActiveInput] = useState<HTMLInputElement | null>(null)
  const startYRef = React.useRef(0)
  const navigate = useNavigate()

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY
    if (startYRef.current < touchEnd && touchEnd - startYRef.current > 200) {
      setIsDialogOpen(true)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startYRef.current = e.clientY
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    const mouseEnd = e.clientY
    if (startYRef.current < mouseEnd && mouseEnd - startYRef.current > 200) {
      setIsDialogOpen(true)
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setActiveInput(event.target)
  }

  const handleKeyPress = (key: string) => {
    if (!activeInput) return
    let newPassword = password
    if (key === 'Backspace') {
      newPassword = newPassword.slice(0, -1)
    } else if (key === 'Space') {
      newPassword += ' '
    } else {
      newPassword += key
    }
    setPassword(newPassword)

    // Manually update the input and set cursor position
    setTimeout(() => {
      activeInput.focus()
      activeInput.value = newPassword
      activeInput.setSelectionRange(newPassword.length, newPassword.length)
    }, 0)
  }

  const handleSubmit = async () => {
    setError('')
    setIsLoading(true)
    try {
      const result = password === 'admin'
      if (result) {
        setIsDialogOpen(false) // Close dialog on success
        navigate({ to: '/admin' })
      } else {
        setError(result || 'Incorrect password.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="w-full h-screen"
    >
      {children}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen)
          if (!isOpen) setActiveInput(null) // Close keyboard when dialog closes
        }}
      >
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'transition-all duration-300 ease-in-out',
            activeInput ? 'top-[calc(50%-100px)]' : 'top-[50%]'
          )}
        >
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>Please enter the admin password to continue.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onFocus={handleFocus}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Enter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={!!activeInput} onOpenChange={(open) => !open && setActiveInput(null)}>
        <SheetContent side="bottom" className="p-0 border-t-0 bg-transparent">
          <Keyboard onKeyPress={handleKeyPress} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
