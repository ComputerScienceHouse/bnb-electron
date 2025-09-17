import bnbLogo from '../assets/bnb.svg'
import { Button } from '../components/ui/button'
import tapIcon from '../assets/tap.svg'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useUserStore } from '@renderer/store/userStore'
import { AnimatedPage } from '@renderer/components/animated-page'
import { Info } from 'lucide-react'
import { AdminAccess } from '@renderer/components/admin-access'

export const Route = createFileRoute('/')({
  component: Welcome
})

function Welcome() {
  const setName = useUserStore((state) => state.setName)

  const handleTapCard = () => {
    const fetchedName = 'Sahil'
    setName(fetchedName)
  }

  return (
    <AdminAccess>
      <AnimatedPage>
        <div className="flex flex-col gap-5">
          <div className="m-4 mb-0 flex flex-row justify-between items-center">
            <h1 className="text-2xl font-mono font-semibold">Welcome</h1>
            <Link to="/info">
              <Button
                variant="ghost"
                className="dark:hover:bg-transparent [&_svg:not([class*='size-'])]:size-10"
              >
                <Info />
              </Button>
            </Link>
          </div>
          <div className="flex gap-10 flex-col items-center">
            <img className="w-96 h-auto" src={bnbLogo}></img>
            <Button onClick={handleTapCard} className="w-96 px-20 py-7 rounded-full text-xl">
              <Link to="/name" className="flex flex-row">
                <img className="w-7 h-auto" src={tapIcon}></img>Tap Card to Continue
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedPage>
    </AdminAccess>
  )
}
