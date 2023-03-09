import React, {lazy, Suspense} from 'react'
import List from './List'
const LazyComp = lazy(() => import('./LazyComp'))
const SimpleComp = lazy(() => import('./SimpleComp'))

const App = () => {
  return (
    <div>
      <header
        style={{height: '100px', lineHeight: '100px', textAlign: 'center'}}>
        Header
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <List />
      </Suspense>
    </div>
  )
}

export default App
