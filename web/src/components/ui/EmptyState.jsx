export default function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="empty-box">
      {Icon && <Icon size={30} color="#0B49B7" style={{ margin: '0 auto 12px' }} />}
      <p className="empty-title">{title}</p>
      {text && <p className="empty-text">{text}</p>}
    </div>
  )
}
