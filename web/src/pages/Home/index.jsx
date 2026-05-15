import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Plus, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { saudacao } from '../../utils/time'
import { OccurrenceCardPublic } from '../../components/ui/OccurrenceCard'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import api from '../../services/api'

export default function Home() {
  const navigate = useNavigate()
  const { user }  = useAuth()
  const [occurrences, setOccurrences] = useState([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    api.get('/occurrences/latest')
      .then(({ data }) => setOccurrences(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="home-header">
        <p className="greeting">{saudacao()},</p>
        <p className="user-name">{user?.name || 'Usuário'}</p>
        <div className="location-row"><MapPin size={13} /><span>Ourinhos, SP</span></div>
        <div className="main-action" onClick={() => navigate('/ocorrencias')}>
          <div className="main-action-icon"><Plus size={22} color="#0B49B7" /></div>
          <div className="main-action-content">
            <p className="main-action-title">Reportar ocorrência</p>
            <p className="main-action-text">Avise sobre problemas na cidade</p>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="page-body">
        <div className="section-header">
          <span className="section-title">Últimas ocorrências</span>
          <div className="view-all-btn" onClick={() => navigate('/ocorrencias')}>
            Ver todas <ArrowRight size={14} />
          </div>
        </div>

        {loading ? <Spinner /> : occurrences.length === 0 ? (
          <EmptyState icon={CheckCircle} title="Tudo tranquilo por aqui" text="Nenhuma ocorrência recente." />
        ) : (
          occurrences.map(item => (
            <OccurrenceCardPublic
              key={item.id}
              item={item}
              onClick={() => navigate('/ocorrencias', { state: { ocorrenciaId: item.id } })}
            />
          ))
        )}
      </div>
    </div>
  )
}
