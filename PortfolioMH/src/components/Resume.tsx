import { forwardRef } from 'react'
import { FaGithub } from 'react-icons/fa'

const Resume = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="section" data-section="resume">
      <div className="resume-content">
        <p className="section-label">Resume</p>
        <h2 className="section-title">
          My <span className="highlight">Resume</span>
        </h2>

        <div className="resume-preview">
          <div className="resume-icon">📄</div>
          <p>Download my resume to learn more about my education, skills, and experience.</p>
          <div className="resume-btn-group">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary">View Resume</button>
            </a>
          </div>
        </div>

        {/* GitHub section */}
        <div className="github-profile">
          <div className="github-avatar">
            <FaGithub />
          </div>
          <h3>GitHub Profile</h3>
          <p>Check out my repositories, contributions, and open-source projects.</p>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <button className="btn-outline">Visit GitHub</button>
          </a>
        </div>

        <div className="career-goal">
          <h4>🎯 Career Goal</h4>
          <p>
            To become a skilled AI/ML Engineer and Robotics Developer, building innovative systems
            that solve real-world problems. I aim to contribute to cutting-edge research and
            technology while continuously growing as a full-stack developer.
          </p>
        </div>
      </div>
    </section>
  )
})

Resume.displayName = 'Resume'
export default Resume
