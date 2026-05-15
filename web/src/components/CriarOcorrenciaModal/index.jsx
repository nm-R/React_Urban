import { useState } from 'react'
import { X, CheckCircle, MapPin } from 'lucide-react'
import { getCategory } from '../../constants/categories'
import CategoryPicker from './CategoryPicker'
import RadiusSlider from './RadiusSlider'
import PhotoPicker from './PhotoPicker'
import api from '../../services/api'

export default function CriarOcorrenciaModal({ coordinate, onClose, onCreate }) {
  const [title, setTitle]             = useState('')
  const [description, setDescription] = useState('')
  const [radius, setRadius]           = useState(100)
  const [category, setCategory]       = useState('TRAFFIC')
  const [photos, setPhotos]           = useState([])
  const [submitting, setSubmitting]   = useState(false)

  const { color } = getCategory(category)
  const canSubmit  = title.trim().length > 0 && !submitting

  function reset() {
    setTitle(''); setDescription(''); setRadius(100); setCategory('TRAFFIC'); setPhotos([])
  }

  function requestClose() {
    const hasDraft = title.trim() || description.trim() || photos.length > 0 || radius !== 100
    if (hasDraft && !confirm('Descartar ocorrência?')) return
    reset(); onClose?.()
  }

  async function submit() {
    if (!canSubmit) return
    setSubmitting(true)
    try {
      const form = new FormData()
      form.append('data', new Blob([JSON.stringify({
        title: title.trim(), description: description.trim(),
        category, radius,
        latitude: coordinate.lat, longitude: coordinate.lng,
      })], { type: 'application/json' }))
      photos.forEach(p => form.append('photos', p.file, p.name))
      await api.post('/occurrences', form)
      reset(); onCreate?.(); onClose?.()
    } catch {
      alert('Falha ao criar ocorrência.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={requestClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ maxWidth: 560, borderRadius: 28 }}>
        <div className="modal-handle" />

        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#132F6B' }}>Nova ocorrência</h2>
            <p style={{ fontSize: 13, color: '#8A9BC4', marginTop: 3 }}>
              <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
              {coordinate?.lat?.toFixed(5)}, {coordinate?.lng?.toFixed(5)}
            </p>
          </div>
          <button className="modal-close" onClick={requestClose}><X size={20} color="#8A9BC4" /></button>
        </div>

        <div style={{ overflowY: 'auto', maxHeight: '65vh', paddingBottom: 100 }}>
          <div className="modal-section">
            <p className="modal-section-title">Área afetada</p>
            <RadiusSlider value={radius} onChange={setRadius} color={color} />
          </div>

          <div className="modal-section">
            <p className="modal-section-title">Categoria</p>
            <CategoryPicker selected={category} onChange={setCategory} />
          </div>

          <div className="modal-section">
            <p className="modal-section-title">Informações</p>
            <div className="form-field">
              <label className="form-label">Título *</label>
              <input className="form-input" placeholder="Ex: Buraco na avenida" value={title} onChange={e => setTitle(e.target.value)} maxLength={80} />
              <p className="helper-text">{title.length}/80</p>
            </div>
            <div className="form-field">
              <label className="form-label">Descrição</label>
              <textarea className="form-input" placeholder="Descreva o que está acontecendo..." value={description} onChange={e => setDescription(e.target.value)} maxLength={280} rows={3} />
              <p className="helper-text">{description.length}/280</p>
            </div>
          </div>

          <div className="modal-section">
            <PhotoPicker photos={photos} onChange={setPhotos} />
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px', borderTop: '1px solid var(--accent-light)' }}>
          <button className="btn-primary" onClick={submit} disabled={!canSubmit} style={{ marginTop: 0 }}>
            {submitting
              ? <div className="spin" style={{ width: 20, height: 20, borderWidth: 2, borderTopColor: '#fff' }} />
              : <><CheckCircle size={18} /> Criar ocorrência</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
