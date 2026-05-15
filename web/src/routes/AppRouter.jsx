import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'

import SignIn    from '../pages/SignIn'
import SignUp    from '../pages/SignUp'
import Home      from '../pages/Home'
import Ocorrencias from '../pages/Ocorrencias'
import Perfil    from '../pages/Perfil'
import Dashboard from '../pages/admin/Dashboard'
import GerenciarOcorrencias from '../pages/admin/GerenciarOcorrencias'
import GerenciarComentarios from '../pages/admin/GerenciarComentarios'

function PrivateRoute({ children, adminOnly = false }) {
  const { signed, user, loading } = useAuth()

  if (loading) return <div className="spinner"><div className="spin" /></div>
  if (!signed) return <Navigate to="/login" replace />
  if (adminOnly && user?.role !== 'ADMIN') return <Navigate to="/" replace />

  return <Layout>{children}</Layout>
}

function PublicRoute({ children }) {
  const { signed, loading } = useAuth()
  if (loading) return <div className="spinner"><div className="spin" /></div>
  if (signed) return <Navigate to="/" replace />
  return children
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><SignUp /></PublicRoute>} />

        {/* App */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/ocorrencias" element={<PrivateRoute><Ocorrencias /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<PrivateRoute adminOnly><Dashboard /></PrivateRoute>} />
        <Route path="/admin/ocorrencias" element={<PrivateRoute adminOnly><GerenciarOcorrencias /></PrivateRoute>} />
        <Route path="/admin/comentarios" element={<PrivateRoute adminOnly><GerenciarComentarios /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
