import { forwardRef } from 'react'
import Tilt3DCard from './Tilt3DCard'

const About = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="section" data-section="about">
      <div className="about-content">
        <div className="about-text">
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Passionate about <span className="highlight">Technology</span> & Innovation
          </h2>
          <p>
            I am <strong>Mahek Hirpara</strong>, a B.Tech student pursuing Computer Science &amp; Engineering.
            I started my development journey in 2025 and have been passionate about AI/ML
            and Robotics ever since.
          </p>
          <p>
            With knowledge of <strong>6+ programming languages</strong>, I've participated in
            <strong> 6+ hackathons</strong> and won a college-level hackathon. Currently, I'm working
            on a robotics project that combines my interests in hardware and intelligent software systems.
          </p>
          <p>
            I believe in learning by building — every project I take on pushes me to explore new
            technologies and solve challenging problems.
          </p>

          <div className="about-stats">
            <Tilt3DCard className="stat-item" intensity={15}>
              <span className="stat-number">6+</span>
              <span className="stat-label">Languages</span>
            </Tilt3DCard>
            <Tilt3DCard className="stat-item" intensity={15}>
              <span className="stat-number">6+</span>
              <span className="stat-label">Hackathons</span>
            </Tilt3DCard>
            <Tilt3DCard className="stat-item" intensity={15}>
              <span className="stat-number">5+</span>
              <span className="stat-label">Projects</span>
            </Tilt3DCard>
            <Tilt3DCard className="stat-item" intensity={15}>
              <span className="stat-number">1</span>
              <span className="stat-label">Hackathon Won</span>
            </Tilt3DCard>
          </div>
        </div>

        <div className="about-image-wrapper">
          <div className="about-image-frame about-frame-3d">
            <span className="placeholder-avatar">👩‍💻</span>
            <div className="about-orbit-ring orbit-1" />
            <div className="about-orbit-ring orbit-2" />
            <div className="about-orbit-ring orbit-3" />
          </div>
          <div className="about-image-glow about-glow-3d" />
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
export default About
