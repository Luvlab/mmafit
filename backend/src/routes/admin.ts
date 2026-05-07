import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin } from '../middleware/auth'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

// ── Overview stats ────────────────────────────────────────────────────────────
router.get('/stats', authenticate, requireAdmin, async (_req, res) => {
  try {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    const [totalMembers, activeMembers, newMembers, totalRevenue, expenses, events, certApps] = await Promise.all([
      prisma.user.count({ where: { role: 'MEMBER' } }),
      prisma.user.count({ where: { role: 'MEMBER', membershipActive: true } }),
      prisma.user.count({ where: { role: 'MEMBER', createdAt: { gte: monthStart } } }),
      prisma.transaction.aggregate({ where: { type: 'INCOME', date: { gte: monthStart } }, _sum: { amount: true } }),
      prisma.transaction.aggregate({ where: { type: 'EXPENSE', date: { gte: monthStart } }, _sum: { amount: true } }),
      prisma.event.count({ where: { startDate: { gte: now } } }),
      prisma.certApplication.count({ where: { status: 'PENDING' } }),
    ])

    res.json({
      members: { total: totalMembers, active: activeMembers, new: newMembers },
      finance: {
        revenue: totalRevenue._sum.amount ?? 0,
        expenses: expenses._sum.amount ?? 0,
        profit: (totalRevenue._sum.amount ?? 0) - (expenses._sum.amount ?? 0),
      },
      upcomingEvents: events,
      pendingCerts: certApps,
    })
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// ── Transactions ──────────────────────────────────────────────────────────────
router.get('/transactions', authenticate, requireAdmin, async (req, res) => {
  try {
    const { page = '1', limit = '50', type, category } = req.query
    const where: any = {}
    if (type) where.type = type
    if (category) where.category = category
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { date: 'desc' },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
      }),
      prisma.transaction.count({ where }),
    ])
    res.json({ transactions, total, pages: Math.ceil(total / Number(limit)) })
  } catch {
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
})

router.post('/transactions', authenticate, requireAdmin, async (req, res) => {
  try {
    const TxSchema = z.object({
      type: z.enum(['INCOME', 'EXPENSE', 'REFUND']),
      category: z.enum(['MEMBERSHIP','SHOP','CERTIFICATION','FRANCHISE','SALARY','RENT','EQUIPMENT','MARKETING','OTHER']),
      amount: z.number(),
      description: z.string(),
      partyName: z.string().optional(),
      date: z.string().optional(),
      vatRate: z.number().default(0.25),
    })
    const data = TxSchema.parse(req.body)
    const vatAmount = data.amount * data.vatRate
    const tx = await prisma.transaction.create({
      data: { ...data, vatAmount, netAmount: data.amount - vatAmount, date: data.date ? new Date(data.date) : new Date() },
    })
    res.status(201).json(tx)
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to create transaction' })
  }
})

// ── Events ────────────────────────────────────────────────────────────────────
router.get('/events', authenticate, requireAdmin, async (_req, res) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { startDate: 'asc' } })
    res.json(events)
  } catch {
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

router.post('/events', authenticate, requireAdmin, async (req, res) => {
  try {
    const event = await prisma.event.create({ data: req.body })
    res.status(201).json(event)
  } catch {
    res.status(500).json({ error: 'Failed to create event' })
  }
})

router.patch('/events/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const event = await prisma.event.update({ where: { id: req.params.id }, data: req.body })
    res.json(event)
  } catch {
    res.status(500).json({ error: 'Failed to update event' })
  }
})

// ── Promo codes ───────────────────────────────────────────────────────────────
router.get('/promos', authenticate, requireAdmin, async (_req, res) => {
  try {
    const promos = await prisma.promoCode.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(promos)
  } catch {
    res.status(500).json({ error: 'Failed to fetch promos' })
  }
})

router.post('/promos', authenticate, requireAdmin, async (req, res) => {
  try {
    const PromoSchema = z.object({
      code: z.string().min(3).toUpperCase(),
      type: z.enum(['PERCENT_OFF', 'FIXED_OFF', 'FREE_CLASS']),
      value: z.number(),
      maxUses: z.number().optional(),
      validTo: z.string().optional(),
    })
    const data = PromoSchema.parse(req.body)
    const promo = await prisma.promoCode.create({ data: { ...data, validTo: data.validTo ? new Date(data.validTo) : undefined } })
    res.status(201).json(promo)
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Failed to create promo code' })
  }
})

// ── Email campaigns ───────────────────────────────────────────────────────────
router.get('/campaigns', authenticate, requireAdmin, async (_req, res) => {
  try {
    const campaigns = await prisma.emailCampaign.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(campaigns)
  } catch {
    res.status(500).json({ error: 'Failed to fetch campaigns' })
  }
})

router.post('/campaigns', authenticate, requireAdmin, async (req, res) => {
  try {
    const campaign = await prisma.emailCampaign.create({ data: req.body })
    res.status(201).json(campaign)
  } catch {
    res.status(500).json({ error: 'Failed to create campaign' })
  }
})

// ── Certifications ────────────────────────────────────────────────────────────
router.get('/certifications', authenticate, requireAdmin, async (_req, res) => {
  try {
    const apps = await prisma.certApplication.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(apps)
  } catch {
    res.status(500).json({ error: 'Failed to fetch cert applications' })
  }
})

router.patch('/certifications/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const app = await prisma.certApplication.update({ where: { id: req.params.id }, data: req.body })
    res.json(app)
  } catch {
    res.status(500).json({ error: 'Failed to update cert application' })
  }
})

// ── Franchise ─────────────────────────────────────────────────────────────────
router.get('/franchises', authenticate, requireAdmin, async (_req, res) => {
  try {
    const franchises = await prisma.franchiseLicense.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(franchises)
  } catch {
    res.status(500).json({ error: 'Failed to fetch franchises' })
  }
})

// ── Tax report export (CSV) ───────────────────────────────────────────────────
router.get('/tax-report', authenticate, requireAdmin, async (req, res) => {
  try {
    const { year = new Date().getFullYear(), quarter } = req.query
    const start = quarter
      ? new Date(Number(year), (Number(quarter) - 1) * 3, 1)
      : new Date(Number(year), 0, 1)
    const end = quarter
      ? new Date(Number(year), Number(quarter) * 3, 0)
      : new Date(Number(year), 11, 31)

    const txs = await prisma.transaction.findMany({
      where: { date: { gte: start, lte: end } },
      orderBy: { date: 'asc' },
    })

    const totalIncome   = txs.filter((t) => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0)
    const totalExpenses = txs.filter((t) => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0)
    const totalVat      = txs.filter((t) => t.type === 'INCOME').reduce((s, t) => s + t.vatAmount, 0)
    const netProfit     = totalIncome - totalExpenses

    // CSV output
    const csv = [
      'Date,Type,Category,Description,Party,Amount,VAT,Net',
      ...txs.map((t) =>
        [t.date.toISOString().split('T')[0], t.type, t.category, `"${t.description}"`, t.partyName ?? '', t.amount, t.vatAmount, t.netAmount].join(',')
      ),
      '',
      `TOTALS,,,,, Income:${totalIncome},VAT:${totalVat},Net Profit:${netProfit}`,
    ].join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=mmafit-tax-${year}${quarter ? '-Q' + quarter : ''}.csv`)
    res.send(csv)
  } catch {
    res.status(500).json({ error: 'Failed to generate tax report' })
  }
})

export default router
