import { formatTime, initials } from '../../utils/time'

function CommentItem({ comment }) {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-avatar">{initials(comment.userName)}</div>
        <div>
          <p className="comment-author">{comment.userName ?? 'Anônimo'}</p>
          {comment.createdAt && <p className="comment-date">{formatTime(comment.createdAt)}</p>}
        </div>
      </div>
      <p className="comment-body">{comment.text}</p>
    </div>
  )
}

export default function CommentList({ comments = [] }) {
  if (comments.length === 0) {
    return <p style={{ textAlign: 'center', color: '#8A9BC4', fontSize: 13, padding: '8px 0 16px' }}>Nenhum comentário ainda.</p>
  }
  return comments.map(c => <CommentItem key={c.id} comment={c} />)
}
