import { ArrowLeft, ArrowUp } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { cn } from '@renderer/lib/utils'

// --- Keyboard Layouts ---
const layouts = {
  default: [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    'Shift z x c v b n m . ,',
    '&123 Space Backspace'
  ],
  shift: [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    'Shift Z X C V B N M ! ?',
    '&123 Space Backspace'
  ],
  symbols: ['1 2 3 4 5 6 7 8 9 0', '@ # $ & - + ( )', '_ = / [ ] { }', 'ABC Space Backspace']
}

const specialKeys = ['Shift', 'Backspace', '&123', 'ABC']

export const Keyboard = ({ onKeyPress }: { onKeyPress: (key: string) => void }) => {
  const [layoutName, setLayoutName] = useState<'default' | 'shift' | 'symbols'>('default')

  const handleKeyPress = (key: string) => {
    if (key === 'Shift') {
      setLayoutName(layoutName === 'default' ? 'shift' : 'default')
    } else if (key === '&123' || key === 'ABC') {
      setLayoutName(layoutName === 'symbols' ? 'default' : 'symbols')
    } else {
      onKeyPress(key)
      if (layoutName === 'shift') {
        setLayoutName('default')
      }
    }
  }

  const layout = layouts[layoutName]

  return (
    <div className="w-full bg-card p-1 rounded-t-lg shadow-lg flex flex-col items-center gap-1 px-16">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 w-full">
          {rowIndex === 1 && <div className="w-8" />}
          {row.split(' ').map((key) => {
            return (
              <Button
                key={key}
                onClick={() => handleKeyPress(key)}
                variant={specialKeys.includes(key) ? 'secondary' : 'outline'}
                className={cn('h-14 text-lg font-mono font-normal px-3', {
                  'flex-1': key.length === 1,
                  'w-20': key.length > 1 && key !== 'Space',
                  'flex-[5]': key === 'Space'
                })}
              >
                {key === 'Shift' && <ArrowUp className="h-5 w-5" />}
                {key === 'Backspace' && <ArrowLeft className="h-5 w-5" />}
                {key === '&123' && <span className="text-base">&123</span>}
                {key === 'ABC' && <span className="text-base">ABC</span>}
                {!specialKeys.includes(key) && key}
              </Button>
            )
          })}
          {rowIndex === 1 && <div className="w-8" />}
        </div>
      ))}
    </div>
  )
}
