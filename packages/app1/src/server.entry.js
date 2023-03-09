import {renderToString, renderToPipeableStream} from 'react-dom/server'
import React from 'react'
import {Hydrate, QueryClientProvider} from '@tanstack/react-query'
import {EventEmitterContext} from './context'
import App from './App'

export function renderAppToString() {
  const content = renderToString(<App />)
  return {content}
}

export function renderAppToPipeableStream(
  options,
  queryClient,
  dehydratedState,
  ee
) {
  const stream = renderToPipeableStream(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <EventEmitterContext.Provider value={ee}>
          <App />
        </EventEmitterContext.Provider>
      </Hydrate>
    </QueryClientProvider>,
    options
  )
  return stream
}
