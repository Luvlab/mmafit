import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import authRoutes      from './routes/auth'
import classRoutes     from './routes/classes'
import bookingRoutes   from './routes/bookings'
import memberRoutes    from './routes/members'
import shopRoutes      from './routes/shop'
import adminRoutes     from './routes/admin'

const app    = express()
const prisma = new PrismaClient()
const PORT   = process.env.PORT ?? 3002

app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5174', credentials: true }))
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date() }))

// Routes
app.use('/api/auth',      authRoutes)
app.use('/api/classes',   classRoutes)
app.use('/api/bookings',  bookingRoutes)
app.use('/api/members',   memberRoutes)
app.use('/api/shop',      shopRoutes)
app.use('/api/admin',     adminRoutes)

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err)
  res.status(500).json({ error: err.message ?? 'Internal server error' })
})

async function main() {
  await prisma.$connect()
  app.listen(PORT, () => console.log(`MMAFit API running on http://localhost:${PORT}`))
}

main().catch((e) => { console.error(e); process.exit(1) })
