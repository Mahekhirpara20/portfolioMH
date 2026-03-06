interface LoadingScreenProps {
  loading: boolean
}

export default function LoadingScreen({ loading }: LoadingScreenProps) {
  return (
    <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
      <div className="loading-3d-cube">
        <div className="loading-cube-face front" />
        <div className="loading-cube-face back" />
        <div className="loading-cube-face right" />
        <div className="loading-cube-face left" />
        <div className="loading-cube-face top" />
        <div className="loading-cube-face bottom" />
      </div>
      <div className="loading-text">MAHEK HIRPARA</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
    </div>
  )
}
