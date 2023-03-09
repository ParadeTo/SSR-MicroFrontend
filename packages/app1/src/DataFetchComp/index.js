import React, {useEffect} from 'react'
import {useFetchData} from './hooks'
import('isomorphic-fetch')
import {useQuery} from '@tanstack/react-query'
async function getData() {
  const rsp = await fetch('http://localhost:9000/json')
  const data = await rsp.json()
  return data
}

const DataFetchComp = () => {
  const query = useQuery(['data'], getData)
  useEffect(() => {
    window.alert('Hydrated')
  }, [])
  return (
    <div onClick={() => console.log('DataFetchComp')}>{query.data.name}</div>
  )
}

export default DataFetchComp
