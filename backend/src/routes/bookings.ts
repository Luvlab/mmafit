import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, type AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user!.id },
      include: {
        session: {
          include: {
            program: { select: { name: true, color: true } },
            trainer: { include: { user: { select: { name: true } } } },
          },
        },
      },
      orderBy: { scheduledDate: 'desc' },
    })
    res.json(bookings)
  } catch {
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { sessionId, scheduledDate } = z.object({
      sessionId: z.string(),
      scheduledDate: z.string(),
    }).parse(req.body)

    const session = await prisma.classSession.findUnique({
      where: { id: sessionId },
      include: { _count: { select: { bookings: { where: { status: 'CONFIRMED' } } } } },
    })
    if (!session) return res.status(404).json({ error: 'Session not found' })

    const status = session._count.bookings >= session.capacity ? 'WAITLISTED' : 'CONFIRMED'

    const booking = await prisma.booking.create({
      data: { userId: req.user!.id, sessionId, scheduledDate: new Date(scheduledDate), status },
    })
    res.status(201).json({ booking, status })
  } catch (err: any) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Already booked this class' })
    res.status(500).json({ error: 'Booking failed' })
  }
})

router.patch('/:id/cancel', authenticate, async (req: AuthRequest, res) => {
  try {
    const booking = await prisma.booking.findFirst({ where: { id: req.params.id, userId: req.user!.id } })
    if (!booking) return res.status(404).json({ error: 'Booking not found' })
    await prisma.booking.update({ where: { id: req.params.id }, data: { status: 'CANCELLED' } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Cancellation failed' })
  }
})

export default router
