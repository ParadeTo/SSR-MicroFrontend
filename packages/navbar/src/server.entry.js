import {renderToString} from 'react-dom/server'
import React from 'react'

import App from './App'

export function renderAppToString() {
  const content = renderToString(<App />)
  return {content}
}
