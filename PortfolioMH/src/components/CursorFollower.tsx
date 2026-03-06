import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  const coords = useRef({ x: 0, y: 0 })
  const trailCoords = useRef(Array.from({ length: 5 }, () => ({ x: 0, y: 0 })))

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      coords.current.x = e.clientX
      coords.current.y = e.clientY
    }

    let raf: number
    function animateTrail() {
      cursor!.style.left = coords.current.x + 'px'
      cursor!.style.top = coords.current.y + 'px'

      trailCoords.current.forEach((tc, i) => {
        const prev = i === 0 ? coords.current : trailCoords.current[i - 1]
        tc.x += (prev.x - tc.x) * 0.35
        tc.y += (prev.y - tc.y) * 0.35
        const el = trailRefs.current[i]
        if (el) {
          el.style.left = tc.x + 'px'
          el.style.top = tc.y + 'px'
        }
      })
      raf = requestAnimationFrame(animateTrail)
    }

    animateTrail()
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el }}
          className="cursor-trail"
          style={{
            width: `${12 - i * 2}px`,
            height: `${12 - i * 2}px`,
            opacity: 0.5 - i * 0.08,
          }}
        />
      ))}
      <div className="cursor-follower" ref={cursorRef} />
    </>
  )
}
