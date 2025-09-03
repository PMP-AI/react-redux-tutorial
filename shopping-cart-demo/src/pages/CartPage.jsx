import Cart from '../components/Cart'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../features/cart/cartSlice'

export default function CartPage() {
  const items = useSelector(selectCartItems)

  return (
    <div style={{ padding: 16 }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: 12 }}>
        ← 回到商品列表
      </Link>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h2>目前購物車沒有商品</h2>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              marginTop: 16,
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: 6,
              textDecoration: 'none',
              color: '#333',
              background: '#f9f9f9',
            }}
          >
            去逛逛 →
          </Link>
        </div>
      ) : (
        <Cart />
      )}
    </div>
  )
}
