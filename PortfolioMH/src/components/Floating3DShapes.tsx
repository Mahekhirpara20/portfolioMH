import { useMemo } from 'react'

interface Shape {
  id: number
  type: 'cube' | 'pyramid' | 'ring' | 'diamond' | 'sphere'
  left: string
  top: string
  size: number
  duration: number
  delay: number
  rotateAxis: string
  color: string
}

export default function Floating3DShapes() {
  const shapes = useMemo<Shape[]>(() => {
    const types: Shape['type'][] = ['cube', 'pyramid', 'ring', 'diamond', 'sphere']
    const colors = [
      'rgba(232, 96, 76, 0.12)',
      'rgba(139, 92, 246, 0.10)',
      'rgba(0, 212, 255, 0.10)',
      'rgba(255, 138, 112, 0.10)',
      'rgba(100, 200, 255, 0.08)'
    ]
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      size: 20 + Math.random() * 40,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      rotateAxis: Math.random() > 0.5 ? 'Y' : 'X',
      color: colors[i % colors.length]
    }))
  }, [])

  return (
    <div className="floating-3d-shapes">
      {shapes.map((s) => (
        <div
          key={s.id}
          className={`shape-3d shape-${s.type}`}
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            ['--shape-color' as string]: s.color,
            ['--rotate-axis' as string]: s.rotateAxis
          }}
        >
          {s.type === 'cube' && <CubeFaces color={s.color} size={s.size} />}
          {s.type === 'pyramid' && <PyramidShape color={s.color} size={s.size} />}
          {s.type === 'ring' && <RingShape color={s.color} size={s.size} />}
          {s.type === 'diamond' && <DiamondShape color={s.color} size={s.size} />}
          {s.type === 'sphere' && <SphereShape color={s.color} size={s.size} />}
        </div>
      ))}
    </div>
  )
}

function CubeFaces({ color, size }: { color: string; size: number }) {
  const half = size / 2
  const faces = [
    { transform: `translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` }
  ]
  return (
    <>
      {faces.map((f, i) => (
        <div
          key={i}
          className="cube-face"
          style={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            border: `1px solid ${color.replace(/[\d.]+\)$/, '0.3)')}`,
            transform: f.transform,
            backfaceVisibility: 'visible'
          }}
        />
      ))}
    </>
  )
}

function PyramidShape({ color, size }: { color: string; size: number }) {
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
          position: 'absolute',
          top: 0,
          left: 0,
          filter: 'drop-shadow(0 0 8px ' + color + ')'
        }}
      />
    </div>
  )
}

function RingShape({ color, size }: { color: string; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        boxShadow: `0 0 15px ${color}, inset 0 0 15px ${color}`
      }}
    />
  )
}

function DiamondShape({ color, size }: { color: string; size: number }) {
  return (
    <div
      style={{
        width: size * 0.7,
        height: size * 0.7,
        background: color,
        transform: 'rotate(45deg)',
        borderRadius: '4px',
        border: `1px solid ${color.replace(/[\d.]+\)$/, '0.4)')}`,
        boxShadow: `0 0 20px ${color}`
      }}
    />
  )
}

function SphereShape({ color, size }: { color: string; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${color.replace(/[\d.]+\)$/, '0.3)')}, ${color})`,
        boxShadow: `0 0 20px ${color}, inset -5px -5px 15px rgba(0,0,0,0.3)`
      }}
    />
  )
}
