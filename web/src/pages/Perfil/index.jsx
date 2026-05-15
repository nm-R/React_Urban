import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, FileText, CheckCircle, Clock, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { initials } from '../../utils/time'
import { OccurrenceCardUser } from '../../components/ui/OccurrenceCard'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import api from '../../services/api'

export default function Perfil() {
  const navigate = useNavigate()
  const { user, logOut } = useAuth()
  const [occurrences, setOccurrences] = useState([])
  const [loading, setLoading]         = useState(true)
  const [reopening, setReopening]     = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try { const { data } = await api.get('/occurrences/my'); setOccurrences(data) }
    catch { alert('Não foi possível carregar suas ocorrências.') }
    finally { setLoading(false) }
  }

  async function handleReopen(id) {
    setReopening(id)
    try { await api.post(`/occurrences/${id}/reopen`); await load() }
    catch { alert('Não foi possível reabrir.') }
    finally { setReopening(null) }
  }

  function handleLogout() {
    if (confirm('Deseja encerrar a sessão?')) { logOut(); navigate('/login') }
  }

  const approved = occurrences.filter(o => o.status === 'APPROVED').length
  const pending  = occurrences.filter(o => o.status === 'PENDING').length

  return (
    <div>
      <div className="profile-header">
        <div className="avatar">{initials(user?.name)}</div>
        <p className="profile-name">{user?.name ?? 'Usuário'}</p>
        <p className="profile-email">{user?.email ?? ''}</p>
        <div className="profile-badge"><MapPin size={12} />Colaborador urbano</div>
      </div>

      <div className="page-body">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          {[
            { icon: FileText,     color: '#0B49B7', bg: '#EEF4FF', value: occurrences.length, label: 'Total'     },
            { icon: CheckCircle,  color: '#10B981', bg: '#D1FAE5', value: approved,            label: 'Aprovadas' },
            { icon: Clock,        color: '#F59E0B', bg: '#FEF3C7', value: pending,             label: 'Pendentes' },
          ].map(({ icon: Icon, color, bg, value, label }) => (
            <div key={label} className="stat-card">
              <div className="stat-icon" style={{ background: bg }}><Icon size={17} color={color} /></div>
              <p className="stat-number" style={{ color }}>{value}</p>
              <p className="stat-label">{label}</p>
            </div>
          ))}
        </div>

        <p className="section-title">Minhas ocorrências</p>

        {loading ? <Spinner /> : occurrences.length === 0 ? (
          <EmptyState icon={FileText} title="Nenhuma ocorrência ainda" text="Seus reportes aparecerão aqui." />
        ) : (
          occurrences.map(item => (
            <OccurrenceCardUser key={item.id} item={item} onReopen={handleReopen} reopening={reopening} />
          ))
        )}

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Encerrar sessão
        </button>
      </div>
    </div>
  )
}
