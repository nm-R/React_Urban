import { useEffect, useState } from 'react'
import { X, Clock, MapPin, User } from 'lucide-react'
import { getCategory } from '../../constants/categories'
import { formatTime } from '../../utils/time'
import Spinner from '../ui/Spinner'
import CommentList from './CommentList'
import CommentInput from './CommentInput'
import api from '../../services/api'

export default function OcorrenciaModal({ item, onClose }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const { color, bg, label } = getCategory(item?.category)
  const data = details ?? item

  useEffect(() => {
    if (!item) return
    setDetails(null)
    fetchDetails()
  }, [item?.id])

  async function fetchDetails() {
    setLoading(true)
    try {
      const [det, comm] = await Promise.all([
        api.get(`/occurrences/${item.id}`),
        api.get(`/occurrences/${item.id}/comments`),
      ])
      setDetails({ ...det.data, comments: comm.data })
    } catch {}
    finally { setLoading(false) }
  }

  function handleCommentAdded(comment) {
    setDetails(prev => ({ ...prev, comments: [...(prev?.comments ?? []), comment] }))
  }

  if (!item) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ maxWidth: 560, borderRadius: 28 }}>
        <div className="modal-handle" />

        <div className="modal-header">
          <div style={{ flex: 1, paddingRight: 14 }}>
            <span className="type-badge" style={{ background: bg, color }}>{label}</span>
            <h2 className="modal-title">{item.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose}><X size={20} color="#8A9BC4" /></button>
        </div>

        {loading ? <Spinner /> : (
          <>
            <div className="modal-section">
              <p className="modal-section-title">Descrição</p>
              <p style={{ fontSize: 14, color: '#62739D', lineHeight: 1.6 }}>{data?.description || 'Sem descrição.'}</p>
              <div style={{ marginTop: 10 }}>
                {data?.createdAt && <div className="meta-row"><Clock size={14} color="#8A9BC4" /><span>{formatTime(data.createdAt)}</span></div>}
                {data?.address   && <div className="meta-row"><MapPin size={14} color="#8A9BC4" /><span>{data.address}</span></div>}
                <div className="meta-row"><User size={14} color="#8A9BC4" /><span>{data?.userName ?? 'Usuário desconhecido'}</span></div>
              </div>
            </div>

            {data?.photoUrls?.length > 0 && (
              <div className="modal-section">
                <p className="modal-section-title">Fotos ({data.photoUrls.length})</p>
                <div className="photos-scroll">
                  {data.photoUrls.map((url, i) => (
                    <img key={i} src={`${api.defaults.baseURL}${url}`} alt={`foto ${i + 1}`} className="photo-item" />
                  ))}
                </div>
              </div>
            )}

            <div className="modal-section">
              <p className="modal-section-title">Comentários ({data?.comments?.length ?? 0})</p>
            </div>
            <CommentList comments={data?.comments} />
            <CommentInput occurrenceId={item.id} onCommentAdded={handleCommentAdded} />
          </>
        )}
      </div>
    </div>
  )
}
