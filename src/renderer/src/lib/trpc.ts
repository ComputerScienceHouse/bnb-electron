import { createTRPCProxyClient } from '@trpc/client'
import { ipcLink } from 'electron-trpc/renderer'
import { AppRouter } from '../../../main/api'

export const client = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
});
