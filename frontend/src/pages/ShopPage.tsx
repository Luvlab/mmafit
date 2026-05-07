import { useState } from 'react'
import { ShoppingCart, Star, Plus } from 'lucide-react'
import { PRODUCTS } from '../services/api'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'
import type { Product } from '../types'

const CATEGORIES = ['All', 'Apparel', 'Equipment', 'Accessories', 'Nutrition']

export default function ShopPage() {
  const { addItem } = useCartStore()
  const [cat, setCat] = useState('All')
  const [selected, setSelected] = useState<Product | null>(null)
  const [size, setSize] = useState<string>('')

  const filtered = cat === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === cat.toLowerCase())

  const handleAdd = (product: Product) => {
    if (product.sizes && !size) {
      setSelected(product)
      return
    }
    addItem(product, size || undefined)
    toast.success(`Added to cart`)
    setSize('')
    setSelected(null)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/8 via-transparent to-transparent" />
        <div className="container-app text-center relative z-10">
          <span className="section-tag">Shop</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Gear Up
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 text-sm max-w-md mx-auto">
            Official MMAFit apparel, equipment, and supplements. Train hard, look sharp.
          </p>
          {/* Category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === c
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="pb-24">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="card group overflow-hidden flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-[var(--bg-card)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-sm font-bold uppercase">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-white text-sm font-semibold leading-tight">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={11} className="text-[var(--gold)] fill-current" />
                    <span className="text-xs text-[var(--text-muted)]">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="font-display font-bold text-white text-lg">{product.price} <span className="text-xs text-[var(--text-muted)] font-sans font-normal">SEK</span></span>
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size picker modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-sm animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-bold text-white text-xl mb-1">Select Size</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-5">{selected.name}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selected.sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-10 rounded-lg text-sm font-medium transition-all border ${
                    size === s
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => { if (size) handleAdd(selected) }}
              disabled={!size}
              className="btn-primary w-full justify-center disabled:opacity-40"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
