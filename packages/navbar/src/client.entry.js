import React from 'react'
import {hydrateRoot} from 'react-dom'
import App from './App'

hydrateRoot(document.getElementById('navbar'), <App />)
