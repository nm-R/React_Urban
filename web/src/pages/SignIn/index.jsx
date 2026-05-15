import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Preencha o e-mail e a senha para continuar.')
      return
    }

    setLoading(true)
    try {
      await signIn(email.trim(), password)
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.error
      if (msg === 'Invalid credentials') { setError('E-mail ou senha inválidos.'); return }
      if (msg === 'User not found')      { setError('Usuário não encontrado.'); return }
      setError('Não foi possível entrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-text">Urbano</span>
          <span className="auth-logo-plus">+</span>
        </div>
        <p className="auth-tagline">Soluções Urbanas</p>

        <h1 className="auth-title">Bem-vindo</h1>
        <p className="auth-subtitle">Acesse sua conta para continuar</p>

        <form onSubmit={handleLogin}>
          <div className="field-group">
            <label className="field-label">E-mail</label>
            <div className="input-wrap">
              <Mail size={18} color="#0B49B7" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Senha</label>
            <div className="input-wrap">
              <Lock size={18} color="#0B49B7" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="error-box">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <div className="spin" style={{ width: 22, height: 22, borderWidth: 2 }} /> : 'Entrar'}
          </button>
        </form>

        <p className="auth-link">
          Ainda não tem conta?
          <span onClick={() => navigate('/register')}>Criar conta</span>
        </p>
      </div>
    </div>
  )
}
