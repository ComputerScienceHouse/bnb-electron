// src/components/InfoCard.tsx
import { ReactNode, createContext, useContext } from 'react'
import { cn } from '@renderer/lib/utils'

interface CardDataContextType {
  id: string
  title?: string
  image?: string
  content?: ReactNode
}

const InfoCardContext = createContext<CardDataContextType | undefined>(undefined)

const useInfoCard = () => {
  const context = useContext(InfoCardContext)
  if (!context) {
    throw new Error('InfoCard subcomponents must be used within an InfoCard component')
  }

  return context
}

interface InfoCardProps {
  children: ReactNode
  className?: string
  data: CardDataContextType
}

export function InfoCard({ children, className, data }: InfoCardProps) {
  return (
    <InfoCardContext.Provider value={data}>
      <div
        id={data.id}
        className={cn('flex flex-col gap-4 rounded-lg bg-primary/20 p-6', className)}
      >
        {children}
      </div>
    </InfoCardContext.Provider>
  )
}

function InfoCardTitle({ className }: { className?: string }) {
  const { title } = useInfoCard()
  if (!title) return null

  return (
    <div className={cn('border-b-2 border-primary/50 pb-2', className)}>
      <h2 className="text-2xl font-bold font-mono">{title}</h2>
    </div>
  )
}

function InfoCardContent({ className }: { className?: string }) {
  const { content } = useInfoCard()
  if (!content) return null

  return <div className={cn(className)}>{content}</div>
}

InfoCard.Title = InfoCardTitle
InfoCard.Content = InfoCardContent
