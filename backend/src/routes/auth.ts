import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { authenticate, type AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

const RegisterSchema = z.object({
  email:    z.string().email(),
  name:     z.string().min(2),
  password: z.string().min(8),
})

const LoginSchema = z.object({
  email:    z.string().email(),
  password: z.string(),
})

router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = RegisterSchema.parse(req.body)
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return res.status(409).json({ error: 'Email already registered' })
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, name, passwordHash },
      select: { id: true, email: true, name: true, role: true, membershipTier: true },
    })
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '30d' })
    res.status(201).json({ user, token })
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = LoginSchema.parse(req.body)
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '30d' })
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, membershipTier: user.membershipTier }, token })
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors })
    res.status(500).json({ error: 'Login failed' })
  }
})

router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, membershipTier: true, membershipActive: true, createdAt: true },
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

router.patch('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const { name, avatar, phone } = req.body
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { name, avatar, phone },
      select: { id: true, email: true, name: true, role: true, avatar: true },
    })
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Update failed' })
  }
})

export default router
