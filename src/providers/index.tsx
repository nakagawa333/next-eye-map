'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
