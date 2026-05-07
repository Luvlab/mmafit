import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQty, total, clear } = useCartStore()
  const cartTotal = total()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={toggleCart}
      />
      <aside className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[var(--bg-secondary)] flex flex-col shadow-2xl animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--accent)]" />
            <span className="font-display font-bold text-lg uppercase tracking-wide">Your Cart</span>
          </div>
          <button onClick={toggleCart} className="p-1.5 text-[var(--text-secondary)] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-[var(--text-muted)]" />
              <p className="text-[var(--text-secondary)]">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[var(--bg-card)]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white leading-tight line-clamp-1">{item.product.name}</p>
                  {item.size && <p className="text-xs text-[var(--text-muted)] mt-0.5">Size: {item.size}</p>}
                  <p className="text-sm font-bold text-[var(--accent)] mt-1">{item.product.price * item.quantity} SEK</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-2 bg-[var(--bg-card)] rounded-lg px-2 py-1">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="text-[var(--text-secondary)] hover:text-white">
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="text-[var(--text-secondary)] hover:text-white">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Total</span>
              <span className="font-display font-bold text-xl text-white">{cartTotal} SEK</span>
            </div>
            <button
              onClick={() => { toast.success('Checkout coming soon!'); }}
              className="btn-primary w-full justify-center"
            >
              Checkout
            </button>
            <button onClick={clear} className="btn-ghost w-full justify-center text-xs">Clear cart</button>
          </div>
        )}
      </aside>
    </>
  )
}
