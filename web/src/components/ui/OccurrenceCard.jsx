import { MapPin, MessageCircle, RotateCcw } from 'lucide-react'
import { getCategory } from '../../constants/categories'
import { formatTime } from '../../utils/time'
import StatusBadge from './StatusBadge'

// Used in Home — shows category badge + comment count
export function OccurrenceCardPublic({ item, onClick }) {
  const { color, label } = getCategory(item.category)
  return (
    <div className="occurrence-card" onClick={onClick}>
      <div className="occurrence-accent" style={{ background: color }} />
      <div className="occurrence-content">
        <div className="occurrence-top">
          <span className="badge" style={{ background: `${color}20`, color }}>{label}</span>
          <span className="time-text">{formatTime(item.createdAt)}</span>
        </div>
        <p className="occurrence-title">{item.title}</p>
        <p className="occurrence-desc">{item.description || 'Sem descrição.'}</p>
        <div className="occurrence-footer">
          <div className="meta-row"><MapPin size={12} color="#8A9BC4" /><span className="time-text">Ourinhos, SP</span></div>
          <div className="meta-row">
            <MessageCircle size={12} color="#0B49B7" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0B49B7' }}>{item.commentCount ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Used in Perfil — shows status badge + rejection reason + reopen button
export function OccurrenceCardUser({ item, onReopen, reopening }) {
  const { color } = getCategory(item.category)
  return (
    <div className="occurrence-card" style={{ cursor: 'default' }}>
      <div className="occurrence-accent" style={{ background: color }} />
      <div className="occurrence-content">
        <div className="occurrence-top">
          <p className="occurrence-title" style={{ marginBottom: 0, flex: 1, paddingRight: 10 }}>{item.title}</p>
          <StatusBadge status={item.status} />
        </div>
        <p style={{ fontSize: 12, color: '#8A9BC4', marginTop: 6 }}>Criada {formatTime(item.createdAt)}</p>

        {item.status === 'REJECTED' && item.rejectionReason && (
          <div className="rejection-box">
            <p className="rejection-title">Motivo da rejeição</p>
            <p className="rejection-text">{item.rejectionReason}</p>
          </div>
        )}

        {item.status === 'EXPIRED' && (
          <button className="reopen-btn" onClick={() => onReopen(item.id)} disabled={reopening === item.id}>
            {reopening === item.id
              ? <div className="spin" style={{ width: 16, height: 16, borderWidth: 2 }} />
              : <><RotateCcw size={15} /> Reabrir ocorrência</>
            }
          </button>
        )}
      </div>
    </div>
  )
}
