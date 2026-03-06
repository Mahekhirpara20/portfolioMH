import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const mouse = { x: width / 2, y: height / 2 }

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouse)

    // Interactive particles that connect to each other and react to mouse
    const particleCount = 90
    const connectionDist = 150
    const mouseDist = 200
    interface Particle {
      x: number; y: number; vx: number; vy: number; size: number; baseSize: number
      color: string; pulse: number; pulseSpeed: number
    }
    const pColors = [
      'rgba(232, 96, 76, 0.7)',
      'rgba(139, 92, 246, 0.6)',
      'rgba(0, 212, 255, 0.6)',
      'rgba(255, 138, 112, 0.5)',
      'rgba(100, 180, 255, 0.5)',
    ]
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const s = 1 + Math.random() * 2.5
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: s,
        baseSize: s,
        color: pColors[Math.floor(Math.random() * pColors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      })
    }

    // Fluid blob parameters
    const blobs: Array<{
      x: number; y: number; radius: number;
      vx: number; vy: number;
      color: string; phase: number
    }> = []
    const colors = [
      'rgba(232, 96, 76, 0.06)',
      'rgba(139, 92, 246, 0.05)',
      'rgba(0, 212, 255, 0.04)',
      'rgba(232, 96, 76, 0.03)',
      'rgba(100, 100, 200, 0.04)',
    ]
    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 200 + Math.random() * 300,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2
      })
    }

    // Stars
    const stars: Array<{ x: number; y: number; size: number; opacity: number; twinkleSpeed: number }> = []
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        opacity: Math.random(),
        twinkleSpeed: 0.005 + Math.random() * 0.025
      })
    }

    // Shooting stars
    interface ShootingStar {
      x: number; y: number; len: number; speed: number; angle: number
      opacity: number; active: boolean; trail: Array<{x: number; y: number}>
    }
    const shootingStars: ShootingStar[] = []
    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.3,
        len: 80 + Math.random() * 120,
        speed: 6 + Math.random() * 8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        active: true,
        trail: []
      })
    }

    let time = 0
    let shootTimer = 0

    function animate() {
      if (!ctx || !canvas) return
      time += 0.008
      shootTimer++
      ctx.clearRect(0, 0, width, height)

      // Dark base
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, width, height)

      // Draw stars with twinkle
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed
        const o = Math.abs(Math.sin(star.opacity))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${o * 0.7})`
        ctx.fill()
        // Cross sparkle on brightest stars
        if (o > 0.8 && star.size > 1.2) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(o - 0.8) * 2})`
          ctx.lineWidth = 0.5
          const sparkLen = star.size * 3
          ctx.beginPath()
          ctx.moveTo(star.x - sparkLen, star.y)
          ctx.lineTo(star.x + sparkLen, star.y)
          ctx.moveTo(star.x, star.y - sparkLen)
          ctx.lineTo(star.x, star.y + sparkLen)
          ctx.stroke()
        }
      })

      // Shooting stars
      if (shootTimer % 180 === 0) spawnShootingStar()
      shootingStars.forEach((ss) => {
        if (!ss.active) return
        ss.trail.push({ x: ss.x, y: ss.y })
        if (ss.trail.length > 20) ss.trail.shift()
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed
        ss.opacity -= 0.012

        // Draw trail
        for (let i = 0; i < ss.trail.length; i++) {
          const t = ss.trail[i]
          const a = (i / ss.trail.length) * ss.opacity
          ctx.beginPath()
          ctx.arc(t.x, t.y, 1.5 * (i / ss.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${a})`
          ctx.fill()
        }
        // Head glow
        ctx.beginPath()
        ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`
        ctx.fill()

        if (ss.opacity <= 0 || ss.x > width + 50 || ss.y > height + 50) {
          ss.active = false
        }
      })

      // Draw fluid blobs (mouse-reactive)
      blobs.forEach((blob) => {
        // Attract slightly toward mouse
        const dx = mouse.x - blob.x
        const dy = mouse.y - blob.y
        blob.vx += dx * 0.00002
        blob.vy += dy * 0.00002
        blob.x += blob.vx
        blob.y += blob.vy
        blob.phase += 0.006

        if (blob.x < -blob.radius) blob.x = width + blob.radius
        if (blob.x > width + blob.radius) blob.x = -blob.radius
        if (blob.y < -blob.radius) blob.y = height + blob.radius
        if (blob.y > height + blob.radius) blob.y = -blob.radius

        const r = blob.radius + Math.sin(blob.phase) * 40

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, r)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Interactive particles
      particles.forEach((p) => {
        p.pulse += p.pulseSpeed
        p.size = p.baseSize + Math.sin(p.pulse) * 0.8

        // Mouse repulsion
        const dxM = p.x - mouse.x
        const dyM = p.y - mouse.y
        const distM = Math.sqrt(dxM * dxM + dyM * dyM)
        if (distM < mouseDist) {
          const force = (mouseDist - distM) / mouseDist * 0.8
          p.vx += (dxM / distM) * force
          p.vy += (dyM / distM) * force
        }

        // Damp velocity
        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Outer glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        glow.addColorStop(0, p.color.replace(/[\d.]+\)$/, '0.15)'))
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.fill()
      })

      // Connection lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(232, 96, 76, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
        // Connect to mouse
        const dxM = particles[i].x - mouse.x
        const dyM = particles[i].y - mouse.y
        const distM = Math.sqrt(dxM * dxM + dyM * dyM)
        if (distM < mouseDist) {
          const alpha = (1 - distM / mouseDist) * 0.25
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(232, 96, 76, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // Aurora waves
      for (let w = 0; w < 3; w++) {
        const yOffset = height * (0.7 + w * 0.08)
        const auroraGrad = ctx.createLinearGradient(0, yOffset - 60, 0, height)
        auroraGrad.addColorStop(0, 'transparent')
        const auroraColors = [
          `rgba(232, 96, 76, ${0.02 + w * 0.01})`,
          `rgba(0, 100, 200, ${0.02 + w * 0.01})`,
          `rgba(139, 92, 246, ${0.015 + w * 0.008})`
        ]
        auroraGrad.addColorStop(0.5, auroraColors[w])
        auroraGrad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width; x += 4) {
          const y = yOffset +
            Math.sin(x * 0.003 + time * (1 + w * 0.5)) * (30 + w * 10) +
            Math.sin(x * 0.007 + time * (1.5 + w * 0.3)) * (15 + w * 5) +
            Math.cos(x * 0.005 + time * (0.5 + w * 0.2)) * (20 + w * 8)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()
        ctx.fillStyle = auroraGrad
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <div className="bg-animated">
      <canvas ref={canvasRef} />
    </div>
  )
}
