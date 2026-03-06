import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub />
      </a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FaLinkedinIn />
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram />
      </a>
      <a href="mailto:25cs020@charusat.edu.in" aria-label="Email">
        <FaEnvelope />
      </a>
    </div>
  )
}
