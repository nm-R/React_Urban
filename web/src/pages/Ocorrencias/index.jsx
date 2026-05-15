import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import { getCategory } from '../../constants/categories'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useOccurrences } from '../../hooks/useOccurrences'
import { makeOccurrenceIcon, makeNewPinIcon, USER_LOCATION_ICON } from '../../components/map/icons.jsx'
import ClickHandler from '../../components/map/ClickHandler'
import { MapHint, MapCounter, MapControls } from '../../components/map/MapControls'
import OcorrenciaModal from '../../components/OcorrenciaModal'
import CriarOcorrenciaModal from '../../components/CriarOcorrenciaModal'
import Spinner from '../../components/ui/Spinner'

const INITIAL_CENTER = [-22.9797, -49.8697]
const INITIAL_ZOOM   = 14

export default function Ocorrencias() {
  const location   = useLocation()
  const mapRef     = useRef(null)

  const { occurrences, loading, refreshing, load } = useOccurrences()
  const { userPos, centerOnUser }                  = useUserLocation(mapRef)

  const [selected, setSelected]       = useState(null)
  const [newCoord, setNewCoord]       = useState(null)
  const [showCircles, setShowCircles] = useState(false)

  useEffect(() => { load() }, [])

  // Deep-link vindo da Home
  useEffect(() => {
    if (!location.state?.ocorrenciaId || occurrences.length === 0) return
    const item = occurrences.find(o => o.id === location.state.ocorrenciaId)
    if (item) setSelected(item)
  }, [location.state?.ocorrenciaId, occurrences])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="map-container" style={{ flex: 1, position: 'relative' }}>
        {loading ? <Spinner fullHeight /> : (
          <MapContainer ref={mapRef} center={INITIAL_CENTER} zoom={INITIAL_ZOOM} style={{ width: '100%', height: '100%' }} zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onMapClick={setNewCoord} />

            {occurrences.map(item => {
              const { color } = getCategory(item.category)
              const pos = [item.latitude, item.longitude]
              return (
                <div key={item.id}>
                  <Marker position={pos} icon={makeOccurrenceIcon(item.category)} eventHandlers={{ click: () => setSelected(item) }} />
                  {showCircles && (
                    <Circle center={pos} radius={item.radius ?? 100} pathOptions={{ color, fillColor: color, fillOpacity: 0.12, weight: 2 }} />
                  )}
                </div>
              )
            })}

            {userPos  && <Marker position={userPos}  icon={USER_LOCATION_ICON} zIndexOffset={1000} />}
            {newCoord && <Marker position={newCoord} icon={makeNewPinIcon()} />}
          </MapContainer>
        )}

        {!loading && (
          <>
            <MapHint />
            <MapCounter count={occurrences.length} />
            <MapControls
              onCenter={centerOnUser}
              onRefresh={() => load(true)}
              onToggleCircles={() => setShowCircles(v => !v)}
              showCircles={showCircles}
              refreshing={refreshing}
              hasLocation={!!userPos}
            />
          </>
        )}
      </div>

      {selected  && <OcorrenciaModal item={selected} onClose={() => setSelected(null)} />}
      {newCoord  && <CriarOcorrenciaModal coordinate={newCoord} onClose={() => setNewCoord(null)} onCreate={() => { load(true); setNewCoord(null) }} />}
    </div>
  )
}
