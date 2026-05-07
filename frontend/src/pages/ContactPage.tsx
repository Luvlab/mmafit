import { useState } from 'react'
import { Mail, MapPin, Instagram, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    toast.success('Message sent! We\'ll be in touch soon.')
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/8 via-transparent to-transparent" />
        <div className="container-app text-center relative z-10">
          <span className="section-tag">Contact</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Get in Touch
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 text-sm max-w-lg mx-auto">
            Questions about membership, certification, franchise licensing, or anything else — we're here.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-app grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* Contact info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-bold text-white text-xl uppercase mb-5">Contact Details</h3>
              <div className="space-y-4">
                <a href="mailto:info@mmafit.se" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors">
                    <Mail size={18} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Email</div>
                    <div className="text-white text-sm group-hover:text-[var(--accent)] transition-colors">info@mmafit.se</div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Address</div>
                    <div className="text-white text-sm">MMAFit Intl.<br />10 Avenue Hoche, 75008 Paris</div>
                  </div>
                </div>
                <a href="https://www.instagram.com/mmafit.academy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-[#e91e8c]/10 border border-[#e91e8c]/20 flex items-center justify-center shrink-0 group-hover:bg-[#e91e8c]/20 transition-colors">
                    <Instagram size={18} className="text-[#e91e8c]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Instagram</div>
                    <div className="text-white text-sm group-hover:text-[#e91e8c] transition-colors">@mmafit.academy</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-bold text-white text-base uppercase mb-3">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: 'Instructor Certification (380 EUR)', href: '/certification' },
                  { label: 'Gym Franchise Licensing', href: '/franchise' },
                  { label: 'Membership Plans', href: '/membership' },
                  { label: 'Class Schedule', href: '/schedule' },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    <CheckCircle size={13} className="text-[var(--accent)] shrink-0" />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <CheckCircle size={48} className="text-[var(--accent)]" />
                <h3 className="font-display font-black text-white text-2xl uppercase">Message Sent!</h3>
                <p className="text-[var(--text-secondary)] text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-secondary mt-2">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-bold text-white text-xl uppercase mb-5">Send a Message</h3>
                <div>
                  <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Your Name</label>
                  <input type="text" value={form.name} onChange={set('name')} className="input-dark" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Email</label>
                  <input type="email" value={form.email} onChange={set('email')} className="input-dark" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Topic</label>
                  <select value={form.subject} onChange={set('subject')} className="input-dark">
                    <option value="general">General Enquiry</option>
                    <option value="membership">Membership</option>
                    <option value="certification">Instructor Certification</option>
                    <option value="franchise">Gym / Franchise</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Message</label>
                  <textarea value={form.message} onChange={set('message')} className="input-dark resize-none" rows={5} placeholder="Tell us what you need…" required />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
