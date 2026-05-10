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

// Programs sourced from mmafit.se/pricing — the 5 official MMAFit categories
export const PROGRAMS = [
  {
    id: '1', name: 'MMAFit Punch', slug: 'punch',
    tagline: 'Every punch hits with purpose', level: 'all',
    description: 'A high-energy boxing workout fusing MMA striking technique with rhythm-based movement and original music. No experience needed — just ready to move.',
    duration: 50, calories: 600, color: '#e8202f',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    features: ['MMA Striking Technique', 'Rhythm Training', 'Original Music', 'Core Work', 'All Levels Welcome'],
    gymFee: 150,
  },
  {
    id: '2', name: 'MMAFit Groove', slug: 'groove',
    tagline: 'Dance meets martial arts', level: 'all',
    description: 'Dance and MMA fused into a beat-driven journey. Fluid transitions, synchronized movement, choreographed to specially composed MMAFit music. A scroll-stopper on social media.',
    duration: 45, calories: 480, color: '#9b59b6',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=600&q=80',
    features: ['Dance Choreography', 'MMA Movements', 'Original Composed Music', 'Beginner Friendly', 'Confidence Building'],
    gymFee: 150,
  },
  {
    id: '3', name: 'MMAFit Hit', slug: 'hit',
    tagline: 'High-intensity combat conditioning', level: 'intermediate',
    description: 'Maximum output conditioning inspired by MMA fight prep. Technical, powerful, and built for results. Every move is intentional, every interval is earned.',
    duration: 55, calories: 700, color: '#ff6b35',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&q=80',
    features: ['Boxing Combos', 'Kick Training', 'HIIT Intervals', 'Cardio Conditioning', 'Fight Prep Inspired'],
    gymFee: 150,
  },
  {
    id: '4', name: 'MMAFit Power', slug: 'power',
    tagline: 'Build real-world strength', level: 'intermediate',
    description: 'Functional strength meets fighter conditioning. Build athlete-level power with MMA-inspired movement. Empowerment through movement — teaches functional MMA techniques while building confidence.',
    duration: 50, calories: 650, color: '#f5a623',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    features: ['Functional Strength', 'MMA Conditioning', 'Core Stability', 'Athlete-Level Training', 'Empowerment Focus'],
    gymFee: 150,
  },
  {
    id: '5', name: 'MMAFit Kids', slug: 'kids',
    tagline: 'Fun, safe, empowering — for ages 6–14', level: 'beginner',
    description: 'Age-appropriate MMA fitness for ages 6–14. Builds coordination, confidence, and discipline in a fun, safe, music-filled environment. Especially popular with parents who want their kids off screens and on to something empowering.',
    duration: 40, calories: 320, color: '#34c759',
    image: 'https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=600&q=80',
    features: ['Ages 6–14', 'Coordination & Balance', 'Confidence Building', 'Discipline', 'Fun & Music'],
    gymFee: 150,
  },
]

// Real founder/trainer bios from mmafit.se
export const TRAINERS = [
  {
    id: '1', name: 'Bertrand Amoussou', slug: 'bertrand',
    title: 'Founder & Head Trainer',
    bio: 'Bertrand Amoussou is the founder of MMAFit. Starting judo at age 10, he earned his black belt by 16 and joined the French national team at 18, training at INSEP — France\'s top sport academy. He is the pioneer of MMA in France, fighting in Vale Tudo and Pride FC, becoming the only French fighter ever to win a fight in that legendary Japanese MMA organisation. He brings world-class martial arts experience to every class — making training both powerful and fun.',
    specialties: ['MMA', 'Judo', 'Vale Tudo', 'Pride FC', 'Program Design'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
    classCount: 12, memberCount: 340,
    socials: { instagram: 'mmafit.academy' },
  },
  {
    id: '2', name: 'Kayo Shekoni', slug: 'kayo',
    title: 'Co-Founder, MMAFit Sweden & Creative Director',
    bio: 'Kayode Shekoni — known as Kayo — is a Swedish-Nigerian artist, dancer, singer, and actress with over four decades of experience on stage, in the studio, and on screen. She has represented Sweden in Eurovision, topped radio charts, and hosted hit TV shows. Today Kayo brings the concept to gyms, instructors, and participants across Sweden. For her, movement is freedom, training is art — and every class is a show where you\'re the star.',
    specialties: ['Dance', 'Choreography', 'Eurovision Artist', 'Performance', 'Rhythm Training'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    classCount: 10, memberCount: 290,
    socials: { instagram: 'mmafit.academy' },
  },
  {
    id: '3', name: 'Diana Svensson', slug: 'diana',
    title: 'Certified MMAFit Instructor',
    bio: '"This is a one-of-a-kind class that brings so many smiles under the same roof. I am not only looking forward to teaching it, but I have a ton of participants signing up weeks ahead of my classes!" Diana is one of MMAFit Sweden\'s most in-demand instructors.',
    specialties: ['MMAFit Punch', 'MMAFit Groove', 'MMAFit Kids'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    classCount: 8, memberCount: 185,
    socials: {},
  },
  {
    id: '4', name: 'Marcus Holm', slug: 'marcus',
    title: 'Certified MMAFit Instructor',
    bio: 'Certified MMAFit instructor specialising in MMAFit Hit and MMAFit Power. Former competitive kickboxer with a background in functional strength training. Builds athlete-level conditioning in everyday people.',
    specialties: ['MMAFit Hit', 'MMAFit Power', 'Kickboxing', 'Strength & Conditioning'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    classCount: 9, memberCount: 212,
    socials: {},
  },
]

// Real program names from mmafit.se (the 5 official categories)
export const CLASS_SCHEDULE: Record<string, any[]> = {
  Monday: [
    { id: 'c1', programName: 'MMAFit Punch', trainerName: 'Bertrand Amoussou', time: '07:00', duration: 50, capacity: 20, enrolled: 18, level: 'All Levels', color: '#e8202f' },
    { id: 'c2', programName: 'MMAFit Groove', trainerName: 'Diana Svensson', time: '12:00', duration: 45, capacity: 16, enrolled: 9, level: 'All Levels', color: '#9b59b6' },
    { id: 'c3', programName: 'MMAFit Hit', trainerName: 'Marcus Holm', time: '18:00', duration: 55, capacity: 18, enrolled: 17, level: 'Intermediate', color: '#ff6b35' },
    { id: 'c4', programName: 'MMAFit Power', trainerName: 'Marcus Holm', time: '19:30', duration: 50, capacity: 15, enrolled: 12, level: 'Intermediate', color: '#f5a623' },
  ],
  Tuesday: [
    { id: 'c5', programName: 'MMAFit Groove', trainerName: 'Kayo Shekoni', time: '09:00', duration: 45, capacity: 20, enrolled: 20, level: 'All Levels', color: '#9b59b6' },
    { id: 'c6', programName: 'MMAFit Punch', trainerName: 'Diana Svensson', time: '17:30', duration: 50, capacity: 20, enrolled: 15, level: 'All Levels', color: '#e8202f' },
    { id: 'c7', programName: 'MMAFit Kids', trainerName: 'Diana Svensson', time: '16:00', duration: 40, capacity: 12, enrolled: 10, level: 'Ages 6–14', color: '#34c759' },
  ],
  Wednesday: [
    { id: 'c8', programName: 'MMAFit Hit', trainerName: 'Bertrand Amoussou', time: '06:30', duration: 55, capacity: 18, enrolled: 16, level: 'Intermediate', color: '#ff6b35' },
    { id: 'c9', programName: 'MMAFit Groove', trainerName: 'Kayo Shekoni', time: '11:30', duration: 45, capacity: 16, enrolled: 11, level: 'All Levels', color: '#9b59b6' },
    { id: 'c10', programName: 'MMAFit Power', trainerName: 'Marcus Holm', time: '18:30', duration: 50, capacity: 15, enrolled: 14, level: 'Intermediate', color: '#f5a623' },
  ],
  Thursday: [
    { id: 'c11', programName: 'MMAFit Punch', trainerName: 'Kayo Shekoni', time: '07:00', duration: 50, capacity: 20, enrolled: 20, level: 'All Levels', color: '#e8202f' },
    { id: 'c12', programName: 'MMAFit Groove', trainerName: 'Diana Svensson', time: '18:00', duration: 45, capacity: 20, enrolled: 13, level: 'All Levels', color: '#9b59b6' },
  ],
  Friday: [
    { id: 'c13', programName: 'MMAFit Hit', trainerName: 'Marcus Holm', time: '06:00', duration: 55, capacity: 18, enrolled: 18, level: 'Intermediate', color: '#ff6b35' },
    { id: 'c14', programName: 'MMAFit Punch', trainerName: 'Bertrand Amoussou', time: '12:00', duration: 50, capacity: 20, enrolled: 19, level: 'All Levels', color: '#e8202f' },
    { id: 'c15', programName: 'MMAFit Power', trainerName: 'Marcus Holm', time: '17:30', duration: 50, capacity: 15, enrolled: 10, level: 'Intermediate', color: '#f5a623' },
  ],
  Saturday: [
    { id: 'c16', programName: 'MMAFit Punch', trainerName: 'Bertrand Amoussou', time: '09:00', duration: 50, capacity: 25, enrolled: 24, level: 'All Levels', color: '#e8202f' },
    { id: 'c17', programName: 'MMAFit Groove', trainerName: 'Kayo Shekoni', time: '10:30', duration: 45, capacity: 20, enrolled: 18, level: 'All Levels', color: '#9b59b6' },
    { id: 'c18', programName: 'MMAFit Kids', trainerName: 'Diana Svensson', time: '12:00', duration: 40, capacity: 12, enrolled: 8, level: 'Ages 6–14', color: '#34c759' },
  ],
  Sunday: [
    { id: 'c19', programName: 'MMAFit Groove', trainerName: 'Kayo Shekoni', time: '10:00', duration: 45, capacity: 16, enrolled: 12, level: 'All Levels', color: '#9b59b6' },
    { id: 'c20', programName: 'MMAFit Hit', trainerName: 'Bertrand Amoussou', time: '11:30', duration: 55, capacity: 18, enrolled: 15, level: 'Intermediate', color: '#ff6b35' },
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

// Real testimonials from mmafit.se
// Verbatim testimonials from mmafit.se
export const TESTIMONIALS = [
  {
    id: 't1', name: 'Annika Öhrström', avatar: 'https://i.pravatar.cc/80?img=1', rating: 5, program: 'MMAFit Punch', since: '2023',
    text: "It's the only workout where I feel like a fighter, a dancer, and a performer – all in one class. MMAFit makes me feel strong, alive, and unstoppable.",
  },
  {
    id: 't2', name: 'Thea Franzén', avatar: 'https://i.pravatar.cc/80?img=5', rating: 5, program: 'MMAFit Groove', since: '2023',
    text: "I've never experienced anything like this before. The choreography is so well-crafted – technical, powerful, but also incredibly fun. I walk out drenched in sweat, buzzing with energy, and feeling more confident in my body and my movements. It's not just a workout, it's a full-body reset.",
  },
  {
    id: 't3', name: 'Diana Svensson', avatar: 'https://i.pravatar.cc/80?img=10', rating: 5, program: 'Instructor', since: '2023',
    text: "As an instructor, I can say that this is a one-of-a kind class that brings so many smiles under the same roof. I am not only looking forward to teaching it, but I have a ton of participants signing up weeks ahead of my classes!",
  },
  {
    id: 't4', name: 'Johan Berg', avatar: 'https://i.pravatar.cc/80?img=3', rating: 5, program: 'MMAFit Hit', since: '2024',
    text: "I walked out drenched in sweat, buzzing with energy — and more confident than I've felt in years. MMAFit Hit is on a completely different level.",
  },
  {
    id: 't5', name: 'Fatima Diallo', avatar: 'https://i.pravatar.cc/80?img=8', rating: 5, program: 'MMAFit Kids', since: '2024',
    text: "Brought my 9-year-old to MMAFit Kids. She's gained so much confidence and actually begs to go to class. That says everything.",
  },
  {
    id: 't6', name: 'Erik Johansson', avatar: 'https://i.pravatar.cc/80?img=12', rating: 5, program: 'Certification', since: '2022',
    text: "I became a certified instructor for 380 EUR. Best investment I've made. The monthly choreography updates keep classes fresh — participants sign up weeks ahead.",
  },
]

export default api
