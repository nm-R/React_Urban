import { Image as ImageIcon } from 'lucide-react'

const MAX_PHOTOS = 5

export default function PhotoPicker({ photos, onChange }) {
  function handleFiles(e) {
    const files     = Array.from(e.target.files ?? [])
    const remaining = MAX_PHOTOS - photos.length
    const added     = files.slice(0, remaining).map(f => ({
      file: f, uri: URL.createObjectURL(f), name: f.name, type: f.type,
    }))
    onChange([...photos, ...added].slice(0, MAX_PHOTOS))
    e.target.value = ''
  }

  function remove(idx) {
    onChange(photos.filter((_, i) => i !== idx))
  }

  return (
    <>
      <p className="modal-section-title">Fotos ({photos.length}/{MAX_PHOTOS})</p>
      <div className="photos-row">
        {photos.map((p, i) => (
          <div key={i} className="photo-thumb">
            <img src={p.uri} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button className="photo-remove" onClick={() => remove(i)}>×</button>
          </div>
        ))}
        {photos.length < MAX_PHOTOS && (
          <label className="add-photo-btn" style={{ cursor: 'pointer' }}>
            <ImageIcon size={17} color="#0B49B7" />
            <span>Foto</span>
            <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />
          </label>
        )}
      </div>
    </>
  )
}
