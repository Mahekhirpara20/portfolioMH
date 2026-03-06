import { useRef, useCallback, type ReactNode, type CSSProperties } from 'react'

interface Tilt3DCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  intensity?: number
  glareEnabled?: boolean
}

export default function Tilt3DCard({
  children,
  className = '',
  style = {},
  intensity = 15,
  glareEnabled = true
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`

    if (glareRef.current && glareEnabled) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
    }
  }, [intensity, glareEnabled])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    if (glareRef.current) {
      glareRef.current.style.background = 'transparent'
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`tilt-3d-card ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glareEnabled && (
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: 2
          }}
        />
      )}
    </div>
  )
}
