import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import api from '../../../services/api'

export default function GerenciarComentarios() {
  const [occurrences, setOccurrences] = useState([])
  const [loading, setLoading]         = useState(true)
  const [deleting, setDeleting]       = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const { data: occs } = await api.get('/occurrences')
      const withComments = await Promise.all(
        occs.map(async (occ) => {
          const { data: comments } = await api.get(`/occurrences/${occ.id}/comments`)
          return { ...occ, comments }
        })
      )
      setOccurrences(withComments.filter(o => o.comments.length > 0))
    } catch {
      alert('Não foi possível carregar os comentários.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(occurrenceId, commentId) {
    if (!confirm('Deseja remover este comentário?')) return
    setDeleting(commentId)
    try {
      await api.delete(`/occurrences/${occurrenceId}/comments/${commentId}`)
      setOccurrences(prev =>
        prev
          .map(o =>
            o.id === occurrenceId
              ? { ...o, comments: o.comments.filter(c => c.id !== commentId) }
              : o
          )
          .filter(o => o.comments.length > 0)
      )
    } catch {
      alert('Não foi possível remover o comentário.')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Moderar Comentários</h1>
        <p>Remova comentários inapropriados</p>
      </div>

      <div className="page-body">
        {loading ? (
          <div className="spinner"><div className="spin" /></div>
        ) : occurrences.length === 0 ? (
          <div className="empty-box">
            <p className="empty-title">Nenhum comentário encontrado.</p>
          </div>
        ) : (
          occurrences.map(occ => (
            <div key={occ.id} className="occ-block">
              <p className="occ-block-title">{occ.title}</p>
              {occ.comments.map(comment => (
                <div key={comment.id} className="comment-row">
                  <div className="comment-row-info">
                    <p className="comment-author">{comment.userName ?? 'Anônimo'}</p>
                    <p className="comment-body">{comment.text}</p>
                    {comment.createdAt && (
                      <p className="comment-date">
                        {new Date(comment.createdAt).toLocaleString('pt-BR')}
                      </p>
                    )}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(occ.id, comment.id)}
                    disabled={deleting === comment.id}
                  >
                    {deleting === comment.id
                      ? <div className="spin" style={{ width: 15, height: 15, borderWidth: 2, borderTopColor: '#EF4444' }} />
                      : <Trash2 size={15} />
                    }
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
