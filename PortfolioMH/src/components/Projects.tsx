import { forwardRef } from 'react'
import Tilt3DCard from './Tilt3DCard'

const projectsData = [
  {
    title: 'Line Following Robot',
    emoji: '🤖',
    category: 'Robotics',
    problem: 'Built an autonomous line-following robot capable of navigating paths using sensor-based detection.',
    tech: ['Arduino', 'IR Sensors', 'Motor Driver', 'C++'],
    contribution: 'Designed the circuit, programmed the control logic, and secured 3rd Runner Up in the competition.'
  },
  {
    title: 'Security Surveillance Robot',
    emoji: '🛡️',
    category: 'Robotics',
    problem: 'Developing a mobile robot for real-time security surveillance in restricted areas.',
    tech: ['Arduino', 'Camera Module', 'Sensors', 'C++'],
    contribution: 'Built the robotic platform with integrated camera and sensor modules for autonomous patrolling.'
  },
  {
    title: 'Smart Irrigation System',
    emoji: '🌱',
    category: 'IoT',
    problem: 'Reducing water waste in agriculture by automating irrigation based on real-time soil moisture data.',
    tech: ['ESP32', 'Soil Moisture Sensor', 'IoT', 'C++'],
    contribution: 'Developed the IoT system with ESP32, integrated moisture sensors, and built automated watering control.'
  },
  {
    title: 'Fingerprint Attendance System',
    emoji: '🔐',
    category: 'IoT',
    problem: 'Automating attendance tracking to eliminate proxy attendance and manual errors.',
    tech: ['Arduino', 'Fingerprint Sensor', 'C++', 'LCD Display'],
    contribution: 'Designed the hardware circuit and programmed the microcontroller for fingerprint matching and data logging.'
  },
  {
    title: 'IoT Monitoring System',
    emoji: '📡',
    category: 'IoT',
    problem: 'Remote monitoring of environmental conditions like temperature and humidity for smart environments.',
    tech: ['Raspberry Pi', 'Sensors', 'Python', 'MQTT'],
    contribution: 'Set up Raspberry Pi with multiple sensors and created a real-time dashboard for data visualization.'
  },
  {
    title: 'Smart Attendance Monitoring',
    emoji: '🏆',
    category: 'Hackathon',
    problem: 'Innovative attendance monitoring solution built under hackathon time constraints.',
    tech: ['Python', 'AI/ML', 'IoT', 'Team Collaboration'],
    contribution: 'Led the team to build a smart attendance tracking prototype combining AI and IoT technologies.'
  },
  {
    title: 'HR Management System',
    emoji: '💼',
    category: 'Hackathon',
    problem: 'Streamlining HR operations with an integrated management platform built during a hackathon.',
    tech: ['React', 'Node.js', 'SQL', 'REST APIs'],
    contribution: 'Developed a full-stack HR management system for employee tracking, leave management, and reporting.'
  }
]

const Projects = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="section" data-section="projects">
      <div className="projects-content">
        <p className="section-label">My Projects</p>
        <h2 className="section-title">
          Things I've <span className="highlight">Built</span>
        </h2>

        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <Tilt3DCard className="project-card stagger-item" key={i} intensity={10} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="project-image project-image-3d">
                <span className="project-emoji-float">{project.emoji}</span>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-problem">{project.problem}</p>
                <div className="project-tech">
                  {project.tech.map((t, j) => (
                    <span key={j}>{t}</span>
                  ))}
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects
