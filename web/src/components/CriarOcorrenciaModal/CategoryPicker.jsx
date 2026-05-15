import { CATEGORIES } from '../../constants/categories'

export default function CategoryPicker({ selected, onChange }) {
  return (
    <div className="category-grid">
      {CATEGORIES.map(cat => {
        const isSelected = selected === cat.key
        const { Icon } = cat
        return (
          <div
            key={cat.key}
            className={`category-chip ${isSelected ? 'selected' : ''}`}
            style={{ color: cat.color, background: isSelected ? cat.bg : undefined, borderColor: isSelected ? cat.color : 'transparent' }}
            onClick={() => onChange(cat.key)}
          >
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: isSelected ? cat.bg : `${cat.color}15`,
              border: `1.5px solid ${cat.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={18} color={cat.color} strokeWidth={2} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, marginTop: 2 }}>{cat.label}</span>
          </div>
        )
      })}
    </div>
  )
}
