import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

router.get('/programs', async (_req, res) => {
  try {
    const programs = await prisma.program.findMany({ where: { active: true }, orderBy: { name: 'asc' } })
    res.json(programs)
  } catch {
    res.status(500).json({ error: 'Failed to fetch programs' })
  }
})

router.get('/sessions', async (_req, res) => {
  try {
    const sessions = await prisma.classSession.findMany({
      where: { active: true },
      include: {
        program: { select: { name: true, color: true } },
        trainer: { include: { user: { select: { name: true } } } },
        _count: { select: { bookings: { where: { status: 'CONFIRMED' } } } },
      },
      orderBy: [{ day: 'asc' }, { time: 'asc' }],
    })
    res.json(sessions)
  } catch {
    res.status(500).json({ error: 'Failed to fetch sessions' })
  }
})

router.post('/sessions', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const SessionSchema = z.object({
      programId: z.string(),
      trainerId: z.string(),
      day: z.enum(['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']),
      time: z.string(),
      duration: z.number(),
      capacity: z.number().default(20),
      location: z.string().default('Main Studio'),
    })
    const data = SessionSchema.parse(req.body)
    const session = await prisma.classSession.create({ data })
    res.status(201).json(session)
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to create session' })
  }
})

router.delete('/sessions/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.classSession.update({ where: { id: req.params.id }, data: { active: false } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete session' })
  }
})

export default router
