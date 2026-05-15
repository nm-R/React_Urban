import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [loading, setLoading]     = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)

  // Restore session from localStorage on mount
  useEffect(() => {
    async function restoreSession() {
      try {
        const token = localStorage.getItem('@urbanoToken')
        if (!token) return

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const { data } = await api.get('/me')
        setUser(data)
      } catch {
        localStorage.removeItem('@urbanoToken')
        delete api.defaults.headers.common['Authorization']
      } finally {
        setLoading(false)
      }
    }
    restoreSession()
  }, [])

  async function signIn(email, password) {
    const { data } = await api.post('/login', { email, password })
    const { token } = data

    localStorage.setItem('@urbanoToken', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const me = await api.get('/me')
    setUser(me.data)
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true)
    try {
      await api.post('/users', { name, email, password })
    } finally {
      setLoadingAuth(false)
    }
  }

  function logOut() {
    localStorage.removeItem('@urbanoToken')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loadingAuth, signIn, signUp, logOut, signed: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
