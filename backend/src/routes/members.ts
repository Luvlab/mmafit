import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  try {
    const members = await prisma.user.findMany({
      where: { role: 'MEMBER' },
      select: { id: true, email: true, name: true, membershipTier: true, membershipActive: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(members)
  } catch {
    res.status(500).json({ error: 'Failed to fetch members' })
  }
})

router.get('/stats', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [total, active, newThisMonth, byTier] = await Promise.all([
      prisma.user.count({ where: { role: 'MEMBER' } }),
      prisma.user.count({ where: { role: 'MEMBER', membershipActive: true } }),
      prisma.user.count({
        where: {
          role: 'MEMBER',
          createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
        },
      }),
      prisma.user.groupBy({ by: ['membershipTier'], where: { role: 'MEMBER' }, _count: { id: true } }),
    ])
    res.json({ total, active, newThisMonth, byTier })
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
      select: { id: true, email: true, name: true, role: true, membershipTier: true, membershipActive: true },
    })
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Update failed' })
  }
})

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Delete failed' })
  }
})

export default router
