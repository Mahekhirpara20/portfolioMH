import { forwardRef, useState, useEffect } from 'react'

const roles = [
  'B.Tech CSE Student',
  'AI & Robotics Enthusiast',
  'Problem Solver',
  'Full Stack Developer',
  'IoT Builder',
]

const Home = forwardRef<HTMLElement>((_, ref) => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = isDeleting ? 40 : 70

    if (!isDeleting && text === current) {
      const pause = setTimeout(() => setIsDeleting(true), 1800)
      return () => clearTimeout(pause)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timer = setTimeout(() => {
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, roleIndex])

  return (
    <section ref={ref} className="section home-section visible" data-section="home">
      {/* 3D floating geometric decoration */}
      <div className="home-3d-scene">
        <div className="hero-cube">
          <div className="hero-cube-face front" />
          <div className="hero-cube-face back" />
          <div className="hero-cube-face right" />
          <div className="hero-cube-face left" />
          <div className="hero-cube-face top" />
          <div className="hero-cube-face bottom" />
        </div>
        <div className="hero-ring ring-1" />
        <div className="hero-ring ring-2" />
        <div className="hero-ring ring-3" />
        <div className="hero-orbit-dot dot-1" />
        <div className="hero-orbit-dot dot-2" />
        <div className="hero-orbit-dot dot-3" />
      </div>

      <span className="home-greeting">
        <span className="greeting-line" />
        Welcome to my world
        <span className="greeting-line" />
      </span>
      <h1 className="home-name">
        <span className="first-name name-3d">Mahek</span>
        <span className="last-name name-3d">Hirpara</span>
      </h1>
      <p className="home-tagline">
        <span className="typing-text">{text}</span>
        <span className="typing-cursor">|</span>
      </p>
      <p className="home-subtitle">
        Building intelligent systems and solving real-world problems through code, hardware, and innovation.
      </p>
      <div className="home-buttons">
        <a href="#projects">
          <button className="btn-primary btn-3d btn-glow">View Projects</button>
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <button className="btn-outline btn-3d btn-glow">Download Resume</button>
        </a>
      </div>

      <div className="scroll-hint">
        <span className="scroll-hint-text">Scroll Down</span>
        <div className="scroll-hint-arrow">
          <span />
          <span />
        </div>
      </div>
    </section>
  )
})

Home.displayName = 'Home'
export default Home
