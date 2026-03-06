import { forwardRef } from 'react'
import Tilt3DCard from './Tilt3DCard'

const certsData = [
  {
    icon: '📜',
    title: 'Python Programming',
    issuer: 'Online Certification'
  },
  {
    icon: '📜',
    title: 'Web Development Fundamentals',
    issuer: 'Online Certification'
  },
  {
    icon: '📜',
    title: 'IoT & Embedded Systems',
    issuer: 'Workshop Certificate'
  },
  {
    icon: '📜',
    title: 'Machine Learning Basics',
    issuer: 'Online Certification'
  },
  {
    icon: '🔧',
    title: 'Hardware',
    issuer: 'Workshop Certificate'
  },
  {
    icon: '📄',
    title: 'Research Paper Presentation',
    issuer: 'Academic Certificate'
  },
  {
    icon: '🤖',
    title: 'AI Tools',
    issuer: 'Online Certification'
  }
]

const Certifications = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="section" data-section="certifications">
      <div className="achievements-content">
        <p className="section-label">Certifications</p>
        <h2 className="section-title">
          Verified <span className="highlight">Knowledge</span>
        </h2>

        <div className="certs-grid">
          {certsData.map((cert, i) => (
            <Tilt3DCard className="cert-card stagger-item" key={i} intensity={18} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="cert-icon cert-icon-3d">{cert.icon}</div>
              <h4>{cert.title}</h4>
              <p>{cert.issuer}</p>
              <div className="cert-shine" />
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  )
})

Certifications.displayName = 'Certifications'
export default Certifications
