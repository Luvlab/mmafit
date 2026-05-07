export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'member' | 'trainer' | 'staff' | 'admin' | 'super_admin'
  membershipTier?: 'starter' | 'pro' | 'elite'
  joinedAt: string
}

export interface Trainer {
  id: string
  name: string
  slug: string
  title: string
  bio: string
  specialties: string[]
  image: string
  socials?: { instagram?: string; facebook?: string }
  classCount: number
  memberCount: number
}

export interface Program {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'all'
  duration: number
  calories: number
  image: string
  color: string
  features: string[]
}

export interface ClassSession {
  id: string
  programId: string
  programName: string
  programColor: string
  trainerId: string
  trainerName: string
  day: string
  time: string
  duration: number
  capacity: number
  enrolled: number
  location: string
  level: string
}

export interface MembershipPlan {
  id: string
  name: string
  price: number
  period: 'month' | 'year'
  description: string
  features: string[]
  highlighted: boolean
  badge?: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: 'apparel' | 'equipment' | 'accessories' | 'nutrition'
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  rating: number
  reviews: number
}

export interface Booking {
  id: string
  classId: string
  className: string
  trainerName: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

export interface WorkoutLog {
  id: string
  date: string
  programName: string
  duration: number
  calories: number
  notes?: string
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  text: string
  rating: number
  program: string
  since: string
}
