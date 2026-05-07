import axios from 'axios'
import type { Product } from '../types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('mmafit-auth')
  if (stored) {
    try {
      const { state } = JSON.parse(stored)
      if (state?.token) config.headers.Authorization = `Bearer ${state.token}`
    } catch {}
  }
  return config
})

// ── Mock data (fallback when backend isn't running) ──────────────────────────

export const PROGRAMS = [
  {
    id: '1', name: 'MMAFit Original', slug: 'original',
    tagline: 'The signature experience', level: 'all',
    description: 'Our flagship class fusing MMA technique, rhythm training, and explosive cardio into one electrifying session. No experience needed.',
    duration: 50, calories: 600, color: '#e8202f',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    features: ['MMA Technique', 'Rhythm Training', 'Cardio Blast', 'Core Work', 'Cool-Down'],
  },
  {
    id: '2', name: 'MMAFit Battle', slug: 'battle',
    tagline: 'Combat cardio at full intensity', level: 'intermediate',
    description: 'Intense combat-style training for those who want to push limits. Boxing combinations, kicks, clinch work — all set to powerful music.',
    duration: 55, calories: 750, color: '#ff6b35',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&q=80',
    features: ['Boxing Combos', 'Kick Training', 'Clinch Work', 'HIIT Intervals', 'Strength Bursts'],
  },
  {
    id: '3', name: 'MMAFit Power', slug: 'power',
    tagline: 'Build strength, move better', level: 'intermediate',
    description: 'Functional strength meets fighter conditioning. Kettlebells, plyometrics, and bodyweight work inspired by elite MMA athlete prep.',
    duration: 50, calories: 680, color: '#f5a623',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    features: ['Kettlebell Work', 'Plyometrics', 'Bodyweight Circuits', 'Core Stability', 'Athlete Conditioning'],
  },
  {
    id: '4', name: 'MMAFit Rhythm', slug: 'rhythm',
    tagline: 'Feel the music, find your power', level: 'beginner',
    description: 'Dance-forward class with MMA movement vocabulary. Choreographed to original music — build confidence and coordination from day one.',
    duration: 45, calories: 480, color: '#9b59b6',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=600&q=80',
    features: ['Dance Choreography', 'MMA Movements', 'Original Music', 'Beginner Friendly', 'Confidence Building'],
  },
  {
    id: '5', name: 'MMAFit Flow', slug: 'flow',
    tagline: 'Recover, restore, recharge', level: 'all',
    description: 'Active recovery meets mindful movement. Yoga-inspired flexibility work combined with fighter mobility drills for total body restoration.',
    duration: 45, calories: 250, color: '#27ae60',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    features: ['Yoga Flow', 'Fighter Mobility', 'Flexibility', 'Breathing Work', 'Stress Relief'],
  },
  {
    id: '6', name: 'MMAFit Kids', slug: 'kids',
    tagline: 'Young fighters, big confidence', level: 'beginner',
    description: 'Age-appropriate MMA fitness for ages 6–14. Build coordination, confidence, and discipline in a fun, safe, music-filled environment.',
    duration: 40, calories: 320, color: '#3498db',
    image: 'https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=600&q=80',
    features: ['Age-Appropriate', 'Coordination', 'Confidence', 'Discipline', 'Fun & Music'],
  },
]

export const TRAINERS = [
  {
    id: '1', name: 'Bertrand Amoussou', slug: 'bertrand',
    title: 'Co-Founder & Head Trainer',
    bio: 'Judo black belt at 16, French national team member, MMA pioneer in France, and now the co-creator of the MMAFit concept. Bertrand brings world-class combat sports expertise to every class.',
    specialties: ['MMA', 'Judo', 'Combat Conditioning', 'Program Design'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
    classCount: 12, memberCount: 340,
    socials: { instagram: '@bertrand_mmafit' },
  },
  {
    id: '2', name: 'Kayo Shekoni', slug: 'kayo',
    title: 'Co-Founder & Creative Director',
    bio: 'Swedish artist, dancer, and singer with 40+ years on stage. Kayo brings the rhythm, choreography, and performance energy that makes MMAFit unlike anything else on the fitness market.',
    specialties: ['Dance', 'Choreography', 'Performance', 'Rhythm Training'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    classCount: 10, memberCount: 290,
    socials: { instagram: '@kayo_mmafit' },
  },
  {
    id: '3', name: 'Sofia Lindqvist', slug: 'sofia',
    title: 'Senior Instructor',
    bio: 'Certified MMAFit instructor with backgrounds in boxing and contemporary dance. Sofia\'s high-energy classes have become some of the most booked on our platform.',
    specialties: ['Boxing', 'Contemporary Dance', 'MMAFit Battle'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    classCount: 8, memberCount: 185,
    socials: {},
  },
  {
    id: '4', name: 'Marcus Holm', slug: 'marcus',
    title: 'Strength & Conditioning Coach',
    bio: 'Former professional kickboxer turned coach. Marcus specialises in MMAFit Power — building athlete-level strength in everyday people.',
    specialties: ['Kickboxing', 'Strength & Conditioning', 'MMAFit Power'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    classCount: 9, memberCount: 212,
    socials: {},
  },
]

export const CLASS_SCHEDULE: Record<string, any[]> = {
  Monday: [
    { id: 'c1', programName: 'MMAFit Original', trainerName: 'Bertrand Amoussou', time: '07:00', duration: 50, capacity: 20, enrolled: 18, level: 'All Levels', color: '#e8202f' },
    { id: 'c2', programName: 'MMAFit Flow', trainerName: 'Sofia Lindqvist', time: '12:00', duration: 45, capacity: 16, enrolled: 9, level: 'All Levels', color: '#27ae60' },
    { id: 'c3', programName: 'MMAFit Battle', trainerName: 'Marcus Holm', time: '18:00', duration: 55, capacity: 18, enrolled: 17, level: 'Intermediate', color: '#ff6b35' },
    { id: 'c4', programName: 'MMAFit Power', trainerName: 'Marcus Holm', time: '19:30', duration: 50, capacity: 15, enrolled: 12, level: 'Intermediate', color: '#f5a623' },
  ],
  Tuesday: [
    { id: 'c5', programName: 'MMAFit Rhythm', trainerName: 'Kayo Shekoni', time: '09:00', duration: 45, capacity: 20, enrolled: 20, level: 'Beginner', color: '#9b59b6' },
    { id: 'c6', programName: 'MMAFit Original', trainerName: 'Sofia Lindqvist', time: '17:30', duration: 50, capacity: 20, enrolled: 15, level: 'All Levels', color: '#e8202f' },
    { id: 'c7', programName: 'MMAFit Kids', trainerName: 'Sofia Lindqvist', time: '16:00', duration: 40, capacity: 12, enrolled: 10, level: 'Kids 6-14', color: '#3498db' },
  ],
  Wednesday: [
    { id: 'c8', programName: 'MMAFit Battle', trainerName: 'Bertrand Amoussou', time: '06:30', duration: 55, capacity: 18, enrolled: 16, level: 'Intermediate', color: '#ff6b35' },
    { id: 'c9', programName: 'MMAFit Flow', trainerName: 'Kayo Shekoni', time: '11:30', duration: 45, capacity: 16, enrolled: 11, level: 'All Levels', color: '#27ae60' },
    { id: 'c10', programName: 'MMAFit Power', trainerName: 'Marcus Holm', time: '18:30', duration: 50, capacity: 15, enrolled: 14, level: 'Intermediate', color: '#f5a623' },
  ],
  Thursday: [
    { id: 'c11', programName: 'MMAFit Original', trainerName: 'Kayo Shekoni', time: '07:00', duration: 50, capacity: 20, enrolled: 20, level: 'All Levels', color: '#e8202f' },
    { id: 'c12', programName: 'MMAFit Rhythm', trainerName: 'Sofia Lindqvist', time: '18:00', duration: 45, capacity: 20, enrolled: 13, level: 'Beginner', color: '#9b59b6' },
  ],
  Friday: [
    { id: 'c13', programName: 'MMAFit Battle', trainerName: 'Marcus Holm', time: '06:00', duration: 55, capacity: 18, enrolled: 18, level: 'Intermediate', color: '#ff6b35' },
    { id: 'c14', programName: 'MMAFit Original', trainerName: 'Bertrand Amoussou', time: '12:00', duration: 50, capacity: 20, enrolled: 19, level: 'All Levels', color: '#e8202f' },
    { id: 'c15', programName: 'MMAFit Power', trainerName: 'Marcus Holm', time: '17:30', duration: 50, capacity: 15, enrolled: 10, level: 'Intermediate', color: '#f5a623' },
  ],
  Saturday: [
    { id: 'c16', programName: 'MMAFit Original', trainerName: 'Bertrand Amoussou', time: '09:00', duration: 50, capacity: 25, enrolled: 24, level: 'All Levels', color: '#e8202f' },
    { id: 'c17', programName: 'MMAFit Rhythm', trainerName: 'Kayo Shekoni', time: '10:30', duration: 45, capacity: 20, enrolled: 18, level: 'Beginner', color: '#9b59b6' },
    { id: 'c18', programName: 'MMAFit Kids', trainerName: 'Sofia Lindqvist', time: '12:00', duration: 40, capacity: 12, enrolled: 8, level: 'Kids 6-14', color: '#3498db' },
  ],
  Sunday: [
    { id: 'c19', programName: 'MMAFit Flow', trainerName: 'Kayo Shekoni', time: '10:00', duration: 45, capacity: 16, enrolled: 12, level: 'All Levels', color: '#27ae60' },
    { id: 'c20', programName: 'MMAFit Battle', trainerName: 'Bertrand Amoussou', time: '11:30', duration: 55, capacity: 18, enrolled: 15, level: 'Intermediate', color: '#ff6b35' },
  ],
}

export const MEMBERSHIP_PLANS = [
  {
    id: 'starter', name: 'Starter', price: 299, period: 'month',
    description: 'Perfect for beginners and casual movers.',
    features: ['4 classes/month', 'Access to MMAFit Rhythm & Flow', 'App access', 'Progress tracking', 'Community forum'],
    highlighted: false,
  },
  {
    id: 'pro', name: 'Pro', price: 499, period: 'month',
    description: 'The most popular plan for serious members.',
    features: ['Unlimited classes', 'All programs', 'App access', 'Progress tracking', 'Nutrition guidance', 'Priority booking', '1 PT session/month'],
    highlighted: true, badge: 'Most Popular',
  },
  {
    id: 'elite', name: 'Elite', price: 799, period: 'month',
    description: 'Full fighter experience with personal coaching.',
    features: ['Unlimited classes', 'All programs', 'Dedicated trainer', '4 PT sessions/month', 'Nutrition coaching', 'Body composition analysis', 'Merchandise discount', 'Certification discount'],
    highlighted: false, badge: 'Best Value',
  },
]

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'MMAFit Logo Tee', price: 349, category: 'apparel', inStock: true, rating: 4.8, reviews: 124, sizes: ['XS','S','M','L','XL','XXL'], colors: ['Black','White','Red'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { id: 'p2', name: 'Fighter Hoodie', price: 699, category: 'apparel', inStock: true, rating: 4.9, reviews: 87, sizes: ['S','M','L','XL'], colors: ['Black','Charcoal'], image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80' },
  { id: 'p3', name: 'MMAFit Leggings', price: 499, category: 'apparel', inStock: true, rating: 4.7, reviews: 203, sizes: ['XS','S','M','L','XL'], colors: ['Black','Red'], image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80' },
  { id: 'p4', name: 'Training Gloves', price: 449, category: 'equipment', inStock: true, rating: 4.6, reviews: 56, sizes: ['S/M','L/XL'], image: 'https://images.unsplash.com/photo-1514512364185-3cceae8ca3c3?w=400&q=80' },
  { id: 'p5', name: 'Jump Rope Pro', price: 199, category: 'equipment', inStock: true, rating: 4.5, reviews: 41, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80' },
  { id: 'p6', name: 'Gym Bag', price: 599, category: 'accessories', inStock: true, rating: 4.7, reviews: 73, colors: ['Black','Red'], image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: 'p7', name: 'Water Bottle 750ml', price: 249, category: 'accessories', inStock: true, rating: 4.4, reviews: 95, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80' },
  { id: 'p8', name: 'Protein Blend', price: 399, category: 'nutrition', inStock: true, rating: 4.6, reviews: 38, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80' },
]

export const TESTIMONIALS = [
  { id: 't1', name: 'Emma Svensson', avatar: 'https://i.pravatar.cc/80?img=1', text: 'I\'ve tried every fitness class in Stockholm. Nothing comes close to MMAFit. The music, the energy, the community — it\'s addictive.', rating: 5, program: 'MMAFit Original', since: '2023' },
  { id: 't2', name: 'Johan Berg', avatar: 'https://i.pravatar.cc/80?img=3', text: 'As someone who\'d never done martial arts, I was nervous. But Bertrand makes you feel capable from minute one. I\'m now a MMAFit Battle regular.', rating: 5, program: 'MMAFit Battle', since: '2023' },
  { id: 't3', name: 'Amira Hassan', avatar: 'https://i.pravatar.cc/80?img=5', text: 'Kayo\'s MMAFit Rhythm class changed my relationship with fitness. I don\'t feel like I\'m working out — I feel like I\'m performing.', rating: 5, program: 'MMAFit Rhythm', since: '2024' },
  { id: 't4', name: 'Lars Nilsson', avatar: 'https://i.pravatar.cc/80?img=8', text: 'Lost 12kg in 4 months training with Marcus. The Power class is genuinely world-class programming, not just jumping around.', rating: 5, program: 'MMAFit Power', since: '2023' },
  { id: 't5', name: 'Fatima Diallo', avatar: 'https://i.pravatar.cc/80?img=10', text: 'Brought my 9-year-old to MMAFit Kids. She\'s gained so much confidence and actually begs to go to class. That says everything.', rating: 5, program: 'MMAFit Kids', since: '2024' },
  { id: 't6', name: 'Erik Johansson', avatar: 'https://i.pravatar.cc/80?img=12', text: 'I became a certified instructor after 6 months as a member. The certification program is thorough, inspiring, and completely life-changing.', rating: 5, program: 'Certification', since: '2022' },
]

export default api
