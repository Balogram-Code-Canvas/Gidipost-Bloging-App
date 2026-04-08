import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import newsletterRouter from './routes/newsletterRoutes.js'

const app = express()

await connectDB()

// ✅ 1. Secure HTTP headers
app.use(helmet())

// ✅ 2. CORS — only your real frontend
const allowedOrigins = [
  'https://gidipost-bloging-app.vercel.app',
  'https://gidipost.com.ng',
  'https://www.gidipost.com.ng',
  'http://localhost:5173',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))

// ✅ 3. Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ✅ 4. Prevent NoSQL injection
app.use(mongoSanitize())

// ✅ 5. Prevent XSS via API body
app.use(xss())

// ✅ 6. General rate limiter — 100 requests per 15 min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(generalLimiter)

// ✅ 7. Strict rate limiter for login — 10 attempts per 15 min
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
})

// ✅ 8. Routes
app.get('/', (req, res) => res.send('API is Working'))
app.use('/api/admin/login', loginLimiter)
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
app.use('/api/newsletter', newsletterRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server running on port ' + PORT))

export default app