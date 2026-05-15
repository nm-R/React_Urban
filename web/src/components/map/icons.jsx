import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { getCategory } from '../../constants/categories'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function svgString(IconComponent, color, size = 18) {
  return renderToStaticMarkup(<IconComponent size={size} color={color} strokeWidth={2} />)
}

function bubbleIcon(svgHtml, color, dashed = false) {
  return L.divIcon({
    className: '',
    html: `<div style="
        position:relative; width:42px; height:42px; border-radius:50%;
        background:${color}22; border:2px ${dashed ? 'dashed' : 'solid'} ${color};
        display:flex; align-items:center; justify-content:center;
        box-shadow:${dashed ? 'none' : '0 2px 8px rgba(0,0,0,0.15)'};
        box-sizing:border-box;">
        ${svgHtml}
      </div>`,
    iconSize: [42, 42], iconAnchor: [21, 21], popupAnchor: [0, -22],
  })
}

export function makeOccurrenceIcon(categoryKey) {
  const { Icon, color } = getCategory(categoryKey)
  return bubbleIcon(svgString(Icon, color), color)
}

export function makeNewPinIcon(categoryKey = 'OTHER') {
  const { Icon, color } = getCategory(categoryKey)
  return bubbleIcon(svgString(Icon, color), color, true)
}

export const USER_LOCATION_ICON = L.divIcon({
  className: '',
  html: `
    <style>@keyframes urbano-pulse{0%{transform:translate(-50%,-50%) scale(1);opacity:.7}100%{transform:translate(-50%,-50%) scale(2.8);opacity:0}}</style>
    <div style="position:relative;width:22px;height:22px;">
      <div style="position:absolute;top:50%;left:50%;width:44px;height:44px;border-radius:50%;background:#3B82F640;animation:urbano-pulse 2s ease-out infinite;"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:22px;height:22px;border-radius:50%;background:#3B82F6;border:3px solid white;box-shadow:0 2px 8px rgba(59,130,246,0.6);z-index:2;"></div>
    </div>`,
  iconSize: [22, 22], iconAnchor: [11, 11],
})
