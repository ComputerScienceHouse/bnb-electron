// src/renderer/src/hooks/useSystemCommands.ts
import { useCallback } from 'react'

export default function useSystemCommands() {
  // System commands that call the main process via the context bridge
  const poweroff = useCallback(() => {
    window.systemApi.poweroff()
  }, [])

  const exit = useCallback(() => {
    window.systemApi.exit()
  }, [])

  // Serial commands that use your existing serial API
  const openHatch = useCallback(() => {
    const packet = { hatch: true }
    const command = JSON.stringify(packet) + '\n'
    window.serialApi.sendData(command)
  }, [])

  const openDoors = useCallback(() => {
    const packet = { doors: true }
    const command = JSON.stringify(packet) + '\n'
    window.serialApi.sendData(command)
  }, [])

  return { poweroff, exit, openHatch, openDoors }
}