import React from 'react'
import {hydrateRoot} from 'react-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import App from './App'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})
hydrateRoot(
  document.getElementById('app1'),
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
