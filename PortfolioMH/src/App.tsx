import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import SocialSidebar from './components/SocialSidebar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Resume from './components/Resume'
import Contact from './components/Contact'
import AnimatedBackground from './components/AnimatedBackground'
import LoadingScreen from './components/LoadingScreen'
import CursorFollower from './components/CursorFollower'
import FloatingParticles from './components/FloatingParticles'
import Floating3DShapes from './components/Floating3DShapes'

const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'certifications', 'resume', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [loading, setLoading] = useState(true)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            const id = entry.target.getAttribute('data-section')
            if (id) setActiveSection(id)
          }
        })
      },
      { threshold: 0.25 }
    )

    const sectionElements = document.querySelectorAll('.section')
    sectionElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading])

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el
  }, [])

  const currentIndex = sections.indexOf(activeSection) + 1
  const total = sections.length

  return (
    <>
      <LoadingScreen loading={loading} />
      {!loading && (
        <>
          <CursorFollower />
          <AnimatedBackground />
          <FloatingParticles />
          <Floating3DShapes />

          {/* Logo */}
          <div className="logo">
            <div className="logo-circle">MH</div>
          </div>

          <Navbar active={activeSection} onNavigate={scrollToSection} />
          <SocialSidebar />

          <main>
            <Home ref={setSectionRef('home')} />
            <About ref={setSectionRef('about')} />
            <Skills ref={setSectionRef('skills')} />
            <Projects ref={setSectionRef('projects')} />
            <Achievements ref={setSectionRef('achievements')} />
            <Certifications ref={setSectionRef('certifications')} />
            <Resume ref={setSectionRef('resume')} />
            <Contact ref={setSectionRef('contact')} />
          </main>

          {/* Page counter */}
          <div className="page-counter">
            <span className="current">{String(currentIndex).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(total).padStart(2, '0')}</span>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" onClick={() => {
            const nextIdx = Math.min(currentIndex, sections.length - 1)
            scrollToSection(sections[nextIdx])
          }}>
            <div className="scroll-dot" />
          </div>
        </>
      )}
    </>
  )
}
