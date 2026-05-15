export default function Spinner({ size = 36, fullHeight = false }) {
  return (
    <div className="spinner" style={fullHeight ? { height: '100%' } : {}}>
      <div className="spin" style={{ width: size, height: size }} />
    </div>
  )
}
