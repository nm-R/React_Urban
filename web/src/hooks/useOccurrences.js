import { useState } from 'react'
import api from '../services/api'

export function useOccurrences(endpoint = '/occurrences') {
  const [occurrences, setOccurrences] = useState([])
  const [loading, setLoading]         = useState(true)
  const [refreshing, setRefreshing]   = useState(false)

  async function load(isRefresh = false) {
    isRefresh ? setRefreshing(true) : setLoading(true)
    try {
      const { data } = await api.get(endpoint)
      setOccurrences(data)
    } catch {
      alert('Não foi possível carregar as ocorrências.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  return { occurrences, loading, refreshing, load, setOccurrences }
}
