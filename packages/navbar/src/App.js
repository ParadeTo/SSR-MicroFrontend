import React from 'react'
import styles from './App.css'
import SimpleComp from './SimpleComp'

const App = () => {
  return (
    <div className={styles.title} onClick={() => window.alert('navbar')}>
      I am Navbar! <SimpleComp />
    </div>
  )
}

export default App
