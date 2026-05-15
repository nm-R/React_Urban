export function formatTime(dateStr) {
  if (!dateStr) return ''
  const corrected = dateStr.endsWith('Z') ? dateStr : `${dateStr}Z`
  const diff = Date.now() - new Date(corrected).getTime()
  const min  = Math.max(1, Math.floor(diff / 60000))
  if (min < 60)   return `${min} min atrás`
  if (min < 1440) return `${Math.floor(min / 60)}h atrás`
  const d = Math.floor(min / 1440)
  return d === 1 ? 'ontem' : `${d} dias atrás`
}

export function saudacao() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function initials(name = '') {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'
}
