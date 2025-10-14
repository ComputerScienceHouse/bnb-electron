import bnbLogo from '../assets/bnb.svg'
import { Button } from '../components/ui/button'
import tapIcon from '../assets/tap.svg'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUserStore } from '@renderer/store/userStore'
import { AnimatedPage } from '@renderer/components/animated-page'
import { Info } from 'lucide-react'
import { AdminAccess } from '@renderer/components/admin-access'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Welcome
})

// function openDoors() {
//   const packet = {
//     hatch: true
//   };
//   const command = JSON.stringify(packet) + '\n';
//   window.serialApi.sendData(command);
//   console.log('Sent "open doors" command.');
// }

function Welcome() {
  const setName = useUserStore((state) => state.setName)
  const navigate = useNavigate();

  useEffect(() => {
    window.serialApi.onSerialData((data: string) => {
      // ✅ ADD THIS LINE to see the data in the app's console.
      console.log('[React Component] Received data from main process:', data);

      // This is where you would update your state to display it
      // setSerialLog(prevLog => [...prevLog, data.trim()]);
    });
  }, []);

  const handleTapCard = () => {
    console.log('Sending open doors command...');
    const packet = { hatch: true };
    const command = JSON.stringify(packet) + '\n';
    window.serialApi.sendData(command);
    // Navigate to the next screen
    setName('Sahil')
    navigate({ to: '/name' });
  };

  return (
    <AdminAccess>
      <AnimatedPage>
        <div className="flex flex-col gap-5">
          <div className="m-4 mb-0 flex flex-row justify-between items-center">
            <h1 className="text-5xl font-mono font-semibold">Welcome</h1>
            <Link to="/info" className='mt-2'>
              <Button
                variant="ghost"
                className="dark:hover:bg-transparent [&_svg:not([class*='size-'])]:size-15"
              >
                <Info />
              </Button>
            </Link>
          </div>
          <div className="flex gap-10 flex-col items-center">
            <img className="w-96 h-auto" src={bnbLogo}></img>
            <Button onClick={handleTapCard} className="w-96 px-20 py-7 rounded-full text-xl">
              <div className="flex flex-row text-2xl justify-center gap-x-3 font-sans">
                <img className="w-7 h-auto" src={tapIcon}></img>Tap Card to Continue
              </div>
            </Button>
          </div>
        </div>
      </AnimatedPage>
    </AdminAccess>
  )
}
