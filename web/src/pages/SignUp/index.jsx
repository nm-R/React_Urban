import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp, loadingAuth } = useAuth()

  const [nome, setNome]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  async function handleSignUp(e) {
    e.preventDefault()
    setError('')

    if (!nome.trim() || !email.trim() || !password) {
      setError('Preencha todos os campos para continuar.')
      return
    }
    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    try {
      await signUp(email.trim(), password, nome.trim())
      navigate('/login')
    } catch (err) {
      const msg = err?.response?.data?.error
      if (msg === 'E-mail already registered') { setError('Este e-mail já está cadastrado.'); return }
      setError('Não foi possível criar sua conta. Tente novamente.')
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

        <h1 className="auth-title">Criar conta</h1>
        <p className="auth-subtitle">Preencha os dados para se cadastrar</p>

        <form onSubmit={handleSignUp}>
          <div className="field-group">
            <label className="field-label">Nome</label>
            <div className="input-wrap">
              <User size={18} color="#0B49B7" />
              <input
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={e => setNome(e.target.value)}
                autoComplete="name"
              />
            </div>
          </div>

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
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && (
            <div className="error-box">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loadingAuth}>
            {loadingAuth ? <div className="spin" style={{ width: 22, height: 22, borderWidth: 2 }} /> : 'Cadastrar'}
          </button>
        </form>

        <p className="auth-link">
          Já tem uma conta?
          <span onClick={() => navigate('/login')}>Entrar</span>
        </p>
      </div>
    </div>
  )
}
