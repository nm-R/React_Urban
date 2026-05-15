import { getStatus } from '../../constants/statusConfig'

export default function StatusBadge({ status }) {
  const { label, color, bg, Icon } = getStatus(status)
  return (
    <span className="status-badge" style={{ background: bg, color }}>
      <Icon size={12} /> {label}
    </span>
  )
}
