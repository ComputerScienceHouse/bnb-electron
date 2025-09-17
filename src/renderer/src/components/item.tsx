import { cn } from '@renderer/lib/utils'

type ItemProps = {
  name: string
  image_url: string
  price: number
  quantity: number
  summary: {
    calories: number
    description: string
  }
  variant: 'cart' | 'receipt'
}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '...' : str
}

export default function Item({ name, image_url, price, quantity, summary, variant }: ItemProps) {
  const isReceipt = variant === 'receipt'

  return (
    <div
      className={cn(
        'flex flex-row items-start p-3 rounded-lg w-full', // Changed to items-start
        isReceipt ? 'bg-background/50' : 'bg-primary/20'
      )}
    >
      <img className={isReceipt ? 'size-[50px]' : 'size-[75px]'} src={image_url} alt={name} />
      <div
        className={cn(
          'flex flex-row w-full justify-between pl-3',
          isReceipt ? 'h-[50px]' : 'h-[75px]' // Corrected height classes
        )}
      >
        <div className="flex flex-col justify-between font-thin">
          <div>
            <p className="leading-none text-md font-normal">{name}</p>
            {!isReceipt && (
              <p className="leading-tight text-sm font-normal">
                {summary.calories} cals, {truncate(summary.description, 20)}
              </p>
            )}
          </div>
          <p className="text-secondary font-bold">${price.toFixed(2)}</p>
        </div>
        <p className={cn('my-auto', isReceipt ? 'text-4xl' : 'text-7xl')}>{quantity}</p>
      </div>
    </div>
  )
}
