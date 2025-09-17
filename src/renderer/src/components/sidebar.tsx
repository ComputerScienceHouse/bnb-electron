import { Link } from '@tanstack/react-router'
import { Button } from '@renderer/components/ui/button'
import { Separator } from '@renderer/components/ui/separator'
import { SquareUser, CreditCard, Mail, Smartphone } from 'lucide-react'
import Union from '../assets/union-dark.svg'
import Timer from '../assets/timer-dark.svg'
import BnBLockUpDark from '../assets/bnblockup-dark.svg'
import { cn } from '@renderer/lib/utils'
import { EditContactButton } from './edit-contact-button'
import { ReactElement } from 'react'

type SidebarProps = {
  variant: 'cart' | 'receipt' // The new variant prop
}

export function Sidebar({ variant }: SidebarProps) {
  return (
    <div
      className={cn(
        'w-[30%] bg-primary/20 m-3 p-2 pb-0 rounded-2xl flex flex-col justify-between items-center',
        variant == 'cart' ? 'gap-y-1' : 'gap-y-1'
      )}
    >
      <div className={cn('items-center', variant === 'receipt' ? 'pt-1' : 'pt-4')}>
        {variant === 'cart' && (
          <Link to="/">
            <Button variant="secondary" className="rounded-xl px-[4.25rem] py-8 text-sm">
              Cancel Transaction
            </Button>
          </Link>
        )}
        {variant === 'receipt' && (
          <Link to="/">
            <Button
              variant="outline"
              className="rounded-xl px-[4.25rem] py-8 text-sm dark:hover:bg-transparent dark:bg-transparent dark:border-secondary"
            >
              Finish Transaction
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-y-4">
        <p className="font-bold text-center">Current User Information</p>
        <div className={cn('flex flex-col', variant === 'cart' ? 'gap-y-4' : 'gap-y-2')}>
          <UserInfoField icon={<SquareUser />} field={{ label: 'Name', value: 'John Doe' }} />
          <UserInfoField icon={<CreditCard />} field={{ label: 'Card', value: 'Dining Dollars' }} />
          <UserInfoField icon={<Mail />} field={{ label: 'Email', value: 'None' }} />
          <UserInfoField icon={<Smartphone />} field={{ label: 'Phone', value: 'None' }} />
        </div>
        <EditContactButton />
      </div>

      <>
        {variant === 'cart' && (
          <div className="flex flex-row items-center gap-x-3">
            <img className="w-7 h-7" src={Union} alt="" />
            Finished? Close the door
          </div>
        )}
        {variant === 'receipt' && (
          <div className="flex flex-row items-center justify-center gap-x-0.5">
            <img className="w-16 h-16 object-contain" src={Timer} alt="Timer Icon" />
            <div className="h-16 flex flex-col justify-center text-sm w-7/12 ">
              <p className="text-sm font-bold leading-none">
                Press finish or wait for the session to time out
              </p>
              <p className="text-xs leading-none">
                If you are having troubles contact your nearest CSHer
              </p>
            </div>
          </div>
        )}
      </>

      <Separator className="bg-foreground/15" />
      <img
        className={cn(variant === 'receipt' ? 'mb-4' : 'mb-6')}
        src={BnBLockUpDark}
        alt="Bits & Bytes"
      />
    </div>
  )
}

type UserInfoFieldProps = {
  icon: ReactElement
  field: { label: string; value: string }
}

function UserInfoField({ icon, field }: UserInfoFieldProps) {
  return (
    <div className="flex flex-row gap-x-4">
      {icon}
      <p>
        {field.label}: {field.value}
      </p>
    </div>
  )
}
