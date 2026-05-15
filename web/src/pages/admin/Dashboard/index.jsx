import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, XCircle, Archive, List, AlertCircle, MessageCircle, ChevronRight } from 'lucide-react'
import api from '../../../services/api'

export default function Dashboard() {
  const navigate  = useNavigate()
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const [pending, rejected, expired] = await Promise.all([
        api.get('/occurrences/admin?status=PENDING'),
        api.get('/occurrences/admin?status=REJECTED'),
        api.get('/occurrences/admin?status=EXPIRED'),
      ])
      setStats({
        pending:  pending.data.length,
        rejected: rejected.data.length,
        expired:  expired.data.length,
        total:    pending.data.length + rejected.data.length + expired.data.length,
      })
    } catch {
      setStats({ pending: 0, rejected: 0, expired: 0, total: 0 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Painel Admin</h1>
        <p>Visão geral das ocorrências</p>
      </div>

      <div className="page-body">
        <p className="section-title">Resumo</p>

        {loading ? (
          <div className="spinner"><div className="spin" /></div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#FEF3C7' }}>
                  <Clock size={18} color="#F59E0B" />
                </div>
                <p className="stat-number" style={{ color: '#F59E0B' }}>{stats.pending}</p>
                <p className="stat-label">Pendentes</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#FEE2E2' }}>
                  <XCircle size={18} color="#EF4444" />
                </div>
                <p className="stat-number" style={{ color: '#EF4444' }}>{stats.rejected}</p>
                <p className="stat-label">Rejeitadas</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#F3F4F6' }}>
                  <Archive size={18} color="#6B7280" />
                </div>
                <p className="stat-number" style={{ color: '#6B7280' }}>{stats.expired}</p>
                <p className="stat-label">Expiradas</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#EEF4FF' }}>
                  <List size={18} color="#0B49B7" />
                </div>
                <p className="stat-number" style={{ color: '#0B49B7' }}>{stats.total}</p>
                <p className="stat-label">Total</p>
              </div>
            </div>

            <p className="section-title">Ações rápidas</p>

            <div className="quick-card" onClick={() => navigate('/admin/ocorrencias')}>
              <div className="quick-icon" style={{ background: '#FEF3C7' }}>
                <AlertCircle size={20} color="#F59E0B" />
              </div>
              <div className="quick-info">
                <p className="quick-title">Revisar pendentes</p>
                <p className="quick-sub">Aprovar ou rejeitar ocorrências</p>
              </div>
              {stats.pending > 0 && (
                <span className="badge" style={{ background: '#F59E0B', color: '#fff', marginRight: 8 }}>
                  {stats.pending}
                </span>
              )}
              <ChevronRight size={18} color="#8A9BC4" />
            </div>

            <div className="quick-card" onClick={() => navigate('/admin/comentarios')}>
              <div className="quick-icon" style={{ background: '#FEE2E2' }}>
                <MessageCircle size={20} color="#EF4444" />
              </div>
              <div className="quick-info">
                <p className="quick-title">Moderar comentários</p>
                <p className="quick-sub">Remover comentários inapropriados</p>
              </div>
              <ChevronRight size={18} color="#8A9BC4" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
