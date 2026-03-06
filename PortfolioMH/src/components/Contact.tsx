import { forwardRef, useState, type FormEvent } from 'react'
import { FaEnvelope, FaLinkedinIn, FaGithub, FaPhone } from 'react-icons/fa'

const Contact = forwardRef<HTMLElement>((_, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.open(`mailto:25cs020@charusat.edu.in?subject=${subject}&body=${body}`, '_self')

    setStatus({ type: 'success', msg: 'Opening your email client...' })
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section ref={ref} className="section" data-section="contact">
      <div className="contact-content">
        <div>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="highlight">Connect</span>
          </h2>

          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-item-icon"><FaEnvelope /></div>
              <div className="contact-item-text">
                <h4>Email</h4>
                <a href="mailto:25cs020@charusat.edu.in">25cs020@charusat.edu.in</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon"><FaLinkedinIn /></div>
              <div className="contact-item-text">
                <h4>LinkedIn</h4>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">linkedin.com/in/mahek-hirpara</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon"><FaGithub /></div>
              <div className="contact-item-text">
                <h4>GitHub</h4>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">github.com/mahek-hirpara</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon"><FaPhone /></div>
              <div className="contact-item-text">
                <h4>Phone</h4>
                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
          <button className="btn-primary" type="submit">
            Send Message
          </button>
          {status && (
            <div className={`form-status ${status.type}`}>{status.msg}</div>
          )}
        </form>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'
export default Contact
