import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

router.get('/products', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({ where: { active: true }, orderBy: { name: 'asc' } })
    res.json(products)
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.post('/products', authenticate, requireAdmin, async (req, res) => {
  try {
    const product = await prisma.product.create({ data: req.body })
    res.status(201).json(product)
  } catch {
    res.status(500).json({ error: 'Failed to create product' })
  }
})

router.post('/orders', authenticate, async (req: AuthRequest, res) => {
  try {
    const { items, shippingAddress } = req.body
    const total = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
    const order = await prisma.order.create({
      data: {
        userId: req.user!.id,
        total,
        shippingAddress,
        status: 'PENDING',
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
            size: i.size,
            color: i.color,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    })
    // Create transaction record
    await prisma.transaction.create({
      data: {
        type: 'INCOME',
        category: 'SHOP',
        amount: total,
        netAmount: total * 0.8,
        vatAmount: total * 0.2,
        description: `Shop order #${order.id.slice(-6)}`,
        partyName: req.user!.email,
        orderId: order.id,
      },
    })
    res.status(201).json(order)
  } catch {
    res.status(500).json({ error: 'Order failed' })
  }
})

router.get('/orders', authenticate, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(orders)
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

export default router
