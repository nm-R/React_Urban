import { CheckCircle, Clock, XCircle, Archive } from 'lucide-react'

export const STATUS_CONFIG = {
  APPROVED: { label: 'Aprovada', color: '#10B981', bg: '#D1FAE5', Icon: CheckCircle },
  PENDING:  { label: 'Pendente', color: '#F59E0B', bg: '#FEF3C7', Icon: Clock       },
  REJECTED: { label: 'Rejeitada', color: '#EF4444', bg: '#FEE2E2', Icon: XCircle    },
  EXPIRED:  { label: 'Expirada', color: '#6B7280', bg: '#F3F4F6', Icon: Archive     },
}

export function getStatus(key) {
  return STATUS_CONFIG[key] ?? STATUS_CONFIG.PENDING
}
