import { useState } from 'react'
import { Send } from 'lucide-react'
import api from '../../services/api'

export default function CommentInput({ occurrenceId, onCommentAdded }) {
  const [text, setText]       = useState('')
  const [sending, setSending] = useState(false)

  async function send() {
    if (!text.trim() || sending) return
    setSending(true)
    try {
      const { data } = await api.post(`/occurrences/${occurrenceId}/comments`, { text: text.trim() })
      onCommentAdded(data)
      setText('')
    } catch {
      alert('Não foi possível enviar o comentário.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="comment-input-area">
      <div className="comment-input-wrap">
        <textarea
          className="comment-textarea"
          placeholder="Escreva um comentário..."
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={280}
          rows={2}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
        />
        <button className="comment-send-btn" onClick={send} disabled={!text.trim() || sending}>
          {sending
            ? <div className="spin" style={{ width: 18, height: 18, borderWidth: 2, borderTopColor: '#fff' }} />
            : <Send size={18} />
          }
        </button>
      </div>
      <p style={{ fontSize: 11, color: '#8A9BC4', marginTop: 4, textAlign: 'right' }}>{text.length}/280</p>
    </div>
  )
}
