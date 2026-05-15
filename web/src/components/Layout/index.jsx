import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Map, User, LayoutDashboard, AlertCircle, MessageCircle, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Layout({ children }) {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'ADMIN'

  function handleLogout() {
    if (confirm('Deseja encerrar a sessão?')) {
      logOut()
      navigate('/login')
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="logo-text">Urbano</span>
          <span className="logo-plus">+</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home size={18} /> <span>Início</span>
          </NavLink>

          <NavLink to="/ocorrencias" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Map size={18} /> <span>Mapa</span>
          </NavLink>

          <NavLink to="/perfil" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <User size={18} /> <span>Meu Perfil</span>
          </NavLink>

          {isAdmin && (
            <>
              <div style={{ height: 1, background: 'var(--accent-mid)', margin: '8px 0' }} />

              <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={18} /> <span>Dashboard</span>
              </NavLink>

              <NavLink to="/admin/ocorrencias" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <AlertCircle size={18} /> <span>Ocorrências</span>
              </NavLink>

              <NavLink to="/admin/comentarios" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <MessageCircle size={18} /> <span>Comentários</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" style={{ width: '100%', color: 'var(--danger)' }} onClick={handleLogout}>
            <LogOut size={18} /> <span>Sair</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
