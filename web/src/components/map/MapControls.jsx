import { Crosshair, RefreshCw } from 'lucide-react'

export function MapHint() {
  return (
    <div className="map-hint">
      <b>Ocorrências no mapa</b>
      <span>Clique no mapa para reportar uma ocorrência</span>
    </div>
  )
}

export function MapCounter({ count }) {
  return (
    <div className="map-counter">
      {count} {count === 1 ? 'ocorrência' : 'ocorrências'}
    </div>
  )
}

export function MapControls({ onCenter, onRefresh, onToggleCircles, showCircles, refreshing, hasLocation }) {
  return (
    <div className="map-buttons">
      <button className="map-btn" onClick={onCenter} title="Minha localização">
        <Crosshair size={19} color={hasLocation ? '#0B49B7' : '#8A9BC4'} />
      </button>
      <button className="map-btn" onClick={onRefresh} title="Atualizar">
        {refreshing
          ? <div className="spin" style={{ width: 18, height: 18, borderWidth: 2 }} />
          : <RefreshCw size={18} color="#0B49B7" />
        }
      </button>
      <button
        className="map-btn"
        onClick={onToggleCircles}
        title={showCircles ? 'Ocultar raios' : 'Mostrar raios'}
        style={{ background: showCircles ? 'var(--accent-light)' : undefined }}
      >
        <span style={{ fontSize: 16 }}>◎</span>
      </button>
    </div>
  )
}
