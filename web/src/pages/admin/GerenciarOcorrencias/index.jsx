import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import api from '../../../services/api'

const STATUS_MAP = {
  pending:  'PENDING',
  rejected: 'REJECTED',
  expired:  'EXPIRED',
}

const FILTERS = [
  { key: 'pending',  label: 'Pendentes',  color: '#F59E0B', bg: '#FEF3C7' },
  { key: 'rejected', label: 'Rejeitadas', color: '#EF4444', bg: '#FEE2E2' },
  { key: 'expired',  label: 'Expiradas',  color: '#6B7280', bg: '#F3F4F6' },
]

export default function GerenciarOcorrencias() {
  const [filter, setFilter]           = useState('pending')
  const [occurrences, setOccurrences] = useState([])
  const [loading, setLoading]         = useState(true)
  const [acting, setActing]           = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [sendingReject, setSendingReject] = useState(false)

  useEffect(() => { load(filter) }, [filter])

  async function load(f) {
    setLoading(true); setOccurrences([])
    try {
      const { data } = await api.get(`/occurrences/admin?status=${STATUS_MAP[f]}`)
      setOccurrences(data)
    } catch {
      alert('Não foi possível carregar as ocorrências.')
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(id) {
    setActing(id)
    try {
      await api.patch(`/occurrences/${id}/approve`)
      setOccurrences(prev => prev.filter(o => o.id !== id))
    } catch {
      alert('Não foi possível aprovar a ocorrência.')
    } finally {
      setActing(null)
    }
  }

  async function handleReject() {
    if (!rejectReason.trim()) { alert('Informe o motivo da rejeição.'); return }
    setSendingReject(true)
    try {
      await api.patch(`/occurrences/${rejectTarget}/reject`, { reason: rejectReason.trim() })
      setOccurrences(prev => prev.filter(o => o.id !== rejectTarget))
      setRejectTarget(null); setRejectReason('')
    } catch {
      alert('Não foi possível rejeitar a ocorrência.')
    } finally {
      setSendingReject(false)
    }
  }

  const currentFilter = FILTERS.find(f => f.key === filter)

  return (
    <div>
      <div className="page-header">
        <h1>Gerenciar Ocorrências</h1>
        <p>Aprovar, rejeitar e acompanhar ocorrências</p>
      </div>

      <div className="page-body">
        <div className="filter-row">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter-chip ${filter === f.key ? 'active' : ''}`}
              style={filter === f.key ? { background: f.bg, color: f.color, borderColor: f.color } : {}}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="spinner"><div className="spin" /></div>
        ) : occurrences.length === 0 ? (
          <div className="empty-box">
            <p className="empty-title">Nenhuma ocorrência {currentFilter?.label.toLowerCase()}.</p>
          </div>
        ) : (
          occurrences.map(item => (
            <div key={item.id} className="admin-card">
              <div className="admin-card-body">
                <div className="admin-card-row">
                  <p className="admin-card-title">{item.title}</p>
                  <span className="status-badge" style={{ background: currentFilter?.bg, color: currentFilter?.color, flexShrink: 0 }}>
                    {currentFilter?.label}
                  </span>
                </div>

                <p className="admin-card-meta">
                  {new Date(item.createdAt).toLocaleString('pt-BR')} · {item.userName}
                </p>

                {item.description && (
                  <p className="admin-card-desc">{item.description}</p>
                )}

                {filter === 'pending' && (
                  <div className="action-row">
                    <button
                      className="action-btn"
                      style={{ background: '#D1FAE5', color: '#10B981' }}
                      onClick={() => handleApprove(item.id)}
                      disabled={acting === item.id}
                    >
                      {acting === item.id
                        ? <div className="spin" style={{ width: 14, height: 14, borderWidth: 2, borderTopColor: '#10B981' }} />
                        : <><Check size={14} /> Aprovar</>
                      }
                    </button>
                    <button
                      className="action-btn"
                      style={{ background: '#FEE2E2', color: '#EF4444' }}
                      onClick={() => setRejectTarget(item.id)}
                      disabled={acting === item.id}
                    >
                      <X size={14} /> Rejeitar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reject modal */}
      {rejectTarget && (
        <div className="reject-overlay" onClick={() => setRejectTarget(null)}>
          <div className="reject-sheet" onClick={e => e.stopPropagation()}>
            <p className="reject-title">Motivo da rejeição</p>
            <textarea
              className="reject-input"
              placeholder="Descreva o motivo..."
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
            />
            <div className="reject-actions">
              <button
                className="reject-btn"
                style={{ background: 'var(--bg)', color: 'var(--text-sub)' }}
                onClick={() => { setRejectTarget(null); setRejectReason('') }}
              >
                Cancelar
              </button>
              <button
                className="reject-btn"
                style={{ background: '#FEE2E2', color: '#EF4444' }}
                onClick={handleReject}
                disabled={sendingReject}
              >
                {sendingReject
                  ? <div className="spin" style={{ width: 14, height: 14, borderWidth: 2, borderTopColor: '#EF4444' }} />
                  : 'Confirmar'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
