export default function RadiusSlider({ value, onChange, color, min = 25, max = 500, step = 25 }) {
  return (
    <div className="radius-card">
      <div className="radius-top">
        <div>
          <p className="radius-value" style={{ color }}>{value}m</p>
          <p className="radius-hint">Raio de abrangência da ocorrência</p>
        </div>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ accentColor: color }}
      />
    </div>
  )
}
