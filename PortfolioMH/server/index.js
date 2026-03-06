import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json({ limit: '1mb' }))

// In-memory message store (replace with DB in production)
const messages = []

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid input types.' })
  }

  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long.' })
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' })
  }

  const entry = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  }

  messages.push(entry)
  console.log('New contact message:', entry)

  res.status(200).json({ success: true, message: 'Message received!' })
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', messages: messages.length })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
