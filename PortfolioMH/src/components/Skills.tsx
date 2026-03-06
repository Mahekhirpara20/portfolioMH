import { forwardRef } from 'react'
import Tilt3DCard from './Tilt3DCard'

const skillsData = [
  {
    icon: '💻',
    title: 'Programming',
    skills: ['C', 'C++', 'Python', 'JavaScript', 'Java', 'SQL']
  },
  {
    icon: '🌐',
    title: 'Web Development',
    skills: ['HTML', 'CSS', 'React', 'Node.js', 'REST APIs']
  },
  {
    icon: '🔌',
    title: 'Hardware / IoT',
    skills: ['ESP32', 'Raspberry Pi', 'Arduino', 'Sensors']
  },
  {
    icon: '🤖',
    title: 'AI / Machine Learning',
    skills: ['YOLO', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas']
  },
  {
    icon: '🛠️',
    title: 'Tools & Platforms',
    skills: ['GitHub', 'VS Code', 'Arduino IDE', 'Linux', 'Figma']
  },
  {
    icon: '🧠',
    title: 'Soft Skills',
    skills: ['Problem Solving', 'Team Work', 'Leadership', 'Communication', 'Public Speaking']
  }
]

const Skills = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="section" data-section="skills">
      <div className="skills-content">
        <p className="section-label">My Skills</p>
        <h2 className="section-title">
          Technologies I <span className="highlight">Work With</span>
        </h2>

        <div className="skills-grid">
          {skillsData.map((cat, i) => (
            <Tilt3DCard className="skill-category stagger-item" key={i} intensity={12} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="skill-category-icon skill-icon-3d">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map((s, j) => (
                  <span className="skill-tag" key={j}>{s}</span>
                ))}
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  )
})

Skills.displayName = 'Skills'
export default Skills
