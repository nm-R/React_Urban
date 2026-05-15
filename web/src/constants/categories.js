import { Car, Construction, Trash2, Shield, Leaf, AlertTriangle } from 'lucide-react'

export const CATEGORIES = [
  { key: 'TRAFFIC',        label: 'Trânsito',       color: '#F59E0B', bg: '#FEF3C7', Icon: Car           },
  { key: 'INFRASTRUCTURE', label: 'Infraestrutura', color: '#EF4444', bg: '#FEE2E2', Icon: Construction  },
  { key: 'SECURITY',       label: 'Segurança',      color: '#3B82F6', bg: '#DBEAFE', Icon: Shield        },
  { key: 'SANITATION',     label: 'Saneamento',     color: '#10B981', bg: '#D1FAE5', Icon: Trash2        },
  { key: 'ENVIRONMENT',    label: 'Meio ambiente',  color: '#22C55E', bg: '#DCFCE7', Icon: Leaf          },
  { key: 'OTHER',          label: 'Outras',         color: '#6B7280', bg: '#F3F4F6', Icon: AlertTriangle },
]

const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.key, c]))

export function getCategory(key) {
  return CATEGORY_MAP[key] ?? CATEGORY_MAP.OTHER
}
