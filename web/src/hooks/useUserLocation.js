import { useEffect, useRef, useState } from 'react'

export function useUserLocation(mapRef) {
  const [userPos, setUserPos] = useState(null)
  const centered = useRef(false)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = [coords.latitude, coords.longitude]
        setUserPos(pos)
        if (!centered.current) {
          centered.current = true
          setTimeout(() => mapRef.current?.setView(pos, 15), 400)
        }
      },
      () => {}
    )
  }, [])

  function centerOnUser() {
    if (userPos) { mapRef.current?.setView(userPos, 16); return }
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        const pos = [coords.latitude, coords.longitude]
        setUserPos(pos)
        mapRef.current?.setView(pos, 16)
      },
      () => alert('Não foi possível obter sua localização.')
    )
  }

  return { userPos, centerOnUser }
}
