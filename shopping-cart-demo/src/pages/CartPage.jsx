import Cart from '../components/Cart'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectSubtotal, clearCart } from '../features/cart/cartSlice'
import { selectDiscount, selectTotal } from '../features/coupon/couponSlice'
import { useCreateOrderMutation } from '../features/products/productsApi'

export default function CartPage() {
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectSubtotal)
  const discount = useSelector(selectDiscount)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const handleCheckout = async () => {
    try {
      await createOrder({
        items,
        subtotal,
        discount,
        total,
        createdAt: new Date().toISOString(),
      }).unwrap()
      dispatch(clearCart())
      // ✅ 成功後自動導向訂單列表
      navigate('/orders')
    } catch (err) {
      console.error('送出訂單失敗:', err)
      alert('❌ 訂單送出失敗')
    }
  }

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
        <>
          <Cart />
          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              style={{
                padding: '10px 18px',
                borderRadius: 6,
                background: '#4caf50',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isLoading ? '送出中…' : '送出訂單'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
