import React from 'react'
import {hydrateRoot} from 'react-dom'
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {EventEmitterContext} from './context'

import App from './App'
const dehydratedState = window.__REACT_QUERY_STATE__
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
    <Hydrate state={dehydratedState}>
      <EventEmitterContext.Provider value={null}>
        <App />
      </EventEmitterContext.Provider>
    </Hydrate>
  </QueryClientProvider>
)
