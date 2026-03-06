import { forwardRef } from 'react'
import Tilt3DCard from './Tilt3DCard'

const achievementsData = [
  {
    icon: '🥇',
    title: 'Techathon Winner',
    desc: 'Won 1st place at the college-level Techathon hackathon, competing against multiple teams with an innovative AI + IoT solution.'
  },
  {
    icon: '💻',
    title: '6+ Hackathon Participations',
    desc: 'Actively participated in over 6 hackathons, gaining experience in rapid prototyping, teamwork, and innovative problem-solving.'
  },
  {
    icon: '⚡',
    title: 'Coding Competitions',
    desc: 'Participated in competitive coding events, sharpening problem-solving skills in data structures and algorithms.'
  },
  {
    icon: '🤖',
    title: 'Robotics Project Lead',
    desc: 'Currently leading a robotics project combining computer vision and mechanical systems for autonomous control.'
  },
  {
    icon: '🧑‍💻',
    title: '6+ Programming Languages',
    desc: 'Proficient in C, C++, Python, JavaScript, Java, and SQL — continuously expanding my technical toolkit.'
  },
  {
    icon: '📄',
    title: 'Research Paper Presentation',
    desc: 'Actively participated in explaining and presenting a research paper, gaining experience in academic communication and technical writing.'
  },
  {
    icon: '🚀',
    title: 'Startup Idea Registered at CSIC',
    desc: 'Successfully registered an innovative startup idea at CSIC, demonstrating entrepreneurial thinking and initiative.'
  }
]

const Achievements = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="section" data-section="achievements">
      <div className="achievements-content">
        <p className="section-label">Achievements</p>
        <h2 className="section-title">
          What I've <span className="highlight">Accomplished</span>
        </h2>

        <div className="achievements-list">
          {achievementsData.map((item, i) => (
            <Tilt3DCard className="achievement-item stagger-item" key={i} intensity={8} glareEnabled={true} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="achievement-icon achievement-icon-3d">{item.icon}</div>
              <div className="achievement-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  )
})

Achievements.displayName = 'Achievements'
export default Achievements
