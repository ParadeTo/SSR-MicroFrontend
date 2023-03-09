import React, {useContext, useEffect} from 'react'
import('isomorphic-fetch')
import {useQuery} from '@tanstack/react-query'
import {EventEmitterContext} from '../context'

async function getList() {
  const rsp = await fetch('http://localhost:9000/api/list')
  const data = await rsp.json()
  return data
}

const List = () => {
  const query = useQuery(['data'], getList)
  const ee = useContext(EventEmitterContext)
  if (ee && query.data && ee) {
    ee.emit('updateState')
  }
  useEffect(() => {
    document.querySelector('#list').style.backgroundColor = 'cyan'
  }, [])

  return (
    <ul id='list' style={{padding: '10px'}}>
      {query.data.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  )
}

export default List
