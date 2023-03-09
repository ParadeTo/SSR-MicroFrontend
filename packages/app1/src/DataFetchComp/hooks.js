import {useState, useEffect} from 'react'

export function useFetchData(fetchFunction) {
  const [data, setData] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      const response = await fetchFunction()
      const jsonData = await response.json()

      if (isMounted) {
        setData(jsonData)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [fetchFunction])

  if (data === null) {
    throw Promise.reject()
  }

  return data
}
