import { AnimatedPage } from '@renderer/components/animated-page'
import { InfoCard } from '@renderer/components/info-card'
import { Button } from '@renderer/components/ui/button'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { MoveLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import aboutProjectImage from '@renderer/assets/info/ai-model-gathering.png'
import { useAnchorNavigation } from '@renderer/hooks/useAnchorNavigation'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info')({
  component: Info
})

const links = [
  {
    label: 'About the Project',
    redirectTo: '#about'
  },
  {
    label: 'FAQ',
    redirectTo: '#faq'
  },
  {
    label: 'About CSH',
    redirectTo: '#aboutcsh'
  },
  {
    label: 'Team Credits',
    redirectTo: '#teamcredits'
  }
]

const infoCardData = {
  aboutProject: {
    id: 'about',
    title: "About the Project: Bits n' Bytes",
    content: (
      <div className="flex flex-row gap-4">
        <img
          src={aboutProjectImage}
          className="w-1/3 object-cover rounded"
          alt="Bits n' Bytes Kiosk"
        />
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat et viverra purus
          eleifend. Mattis a amet...
        </p>
      </div>
    )
  },
  faq: {
    id: 'faq',
    title: 'Frequently Asked Questions',
    content: (
      <>
        <div>
          <h3 className="font-bold">Q1: What types of payment are accepted?</h3>
          <p className="text-muted-foreground">
            Currently we are accepting CSH drink credits and RIT dinning dollars.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Q2: Lorem ipsum dolor sit amet consectetur.</h3>
          <p className="text-muted-foreground">
            Volutpat et viverra augue quisque ornare a egestas diam eleifend.
          </p>
        </div>
      </>
    )
  }
}

export function Info() {
  useAnchorNavigation()

  return (
    <AnimatedPage>
      <div className="flex flex-col h-screen gap-y-10">
        <h1 className="m-4 mb-0 text-2xl font-mono font-semibold">About Bits n&apos; Bytes</h1>
        <div className="flex flex-row flex-1 overflow-hidden gap-x-8">
          <div className="flex flex-col w-[20%] ml-10 text-left gap-y-2">
            <p className="font-mono text-bold text-md text-secondary">Navigation</p>
            {links.map((link, i) => (
              <Link key={i} to={link.redirectTo}>
                <Button variant="link" className="text-foreground p-0">
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link to="/">
              <Button className="gap-x-3 w-fit">
                <MoveLeft />
                Back to Start
              </Button>
            </Link>
          </div>
          <div className="w-[80%] pr-4">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-y-5">
                {Object.values(infoCardData).map((data, i) => (
                  <InfoCard key={i} data={data}>
                    <InfoCard.Title />
                    <InfoCard.Content />
                  </InfoCard>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
