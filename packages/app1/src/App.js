import React, {lazy, Suspense} from 'react'
import DataFetchComp from './DataFetchComp'
const LazyComp = lazy(() => import('./LazyComp'))
const SimpleComp = lazy(() => import('./SimpleComp'))

const App = () => {
  return (
    <div>
      I am App1!
      <Suspense fallback={<p>loading simple comp</p>}>
        <SimpleComp />
      </Suspense>
      {/* <Suspense fallback={<p>loading lazy comp</p>}>
        <LazyComp />
      </Suspense> */}
      <Suspense fallback={<p>loading data fetching comp</p>}>
        <DataFetchComp />
      </Suspense>
    </div>
  )
}

export default App
