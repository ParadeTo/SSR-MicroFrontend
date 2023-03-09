import {renderToString, renderToPipeableStream} from 'react-dom/server'
import React from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import App from './App'

export function renderAppToString() {
  const content = renderToString(<App />)
  return {content}
}

export function renderAppToPipeableStream(options) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  })

  return renderToPipeableStream(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    options
  )
}
