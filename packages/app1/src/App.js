import React from 'react'
import styles from './App.css'
import SimpleComp from './SimpleComp'

const App = () => {
  return (
    <div className={styles.title}>
      I am App1! <SimpleComp />
    </div>
  )
}

export default App
