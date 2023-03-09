import React, {useContext, useEffect} from 'react'
import('isomorphic-fetch')
import {useQuery} from '@tanstack/react-query'
import {EventEmitterContext} from '../context'

async function getProfile() {
  const rsp = await fetch('http://localhost:9000/api/profile')
  const data = await rsp.json()
  return data
}

const Profile = () => {
  const query = useQuery(['profile'], getProfile)
  const ee = useContext(EventEmitterContext)
  if (ee && query.data && ee) {
    ee.emit('updateState')
  }
  useEffect(() => {
    document.querySelector('#profile').style.backgroundColor = 'cyan'
  }, [])

  return (
    <header
      id='profile'
      style={{height: '100px', lineHeight: '100px', textAlign: 'center'}}>
      {query.data.name} - {query.data.age}
    </header>
  )
}

export default Profile
