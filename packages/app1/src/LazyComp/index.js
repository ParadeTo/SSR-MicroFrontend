import React from 'react'

const LazyComp = () => {
  const start = Date.now()
  while (Date.now() - start < 2000) {}
  return (
    <div onClick={() => window.alert('Lazy Component')}>Lazy Component</div>
  )
}

export default LazyComp
