import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItems, selectSubtotal, changeQty, removeFromCart, clearCart
} from '../features/cart/cartSlice'
import { applyCoupon, clearCoupon, selectCoupon, selectDiscount, selectTotal } from '../features/coupon/couponSlice'
import { nt } from '../utils/format'
import { useState } from 'react'

export default function Cart() {
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectSubtotal)
  const discount = useSelector(selectDiscount)
  const total = useSelector(selectTotal)
  const coupon = useSelector(selectCoupon)
  const dispatch = useDispatch()
  const [codeInput, setCodeInput] = useState('')

  return (
    <div style={{ padding: 16, borderTop: '1px solid #eee' }}>
      <h2>購物車</h2>
      {items.length === 0 && <p>購物車是空的。</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map(it => (
          <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto auto', gap: 12, alignItems: 'center' }}>
            <img src={it.thumbnail} alt={it.title} style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 6 }} />
            <div>
              <div style={{ fontWeight: 600 }}>{it.title}</div>
              <div>{nt(it.price)}</div>
            </div>
            <input
              type="number"
              min="1"
              value={it.qty}
              onChange={(e) => dispatch(changeQty({ id: it.id, qty: Number(e.target.value) }))}
              style={{ width: 64 }}
            />
            <button onClick={() => dispatch(removeFromCart(it.id))}>移除</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <button onClick={() => dispatch(clearCart())} disabled={items.length === 0}>清空購物車</button>
      </div>

      {/* Coupon */}
      <div style={{ marginTop: 24, maxWidth: 360 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>折扣碼</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="例如：SAVE100 或 OFF10"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            style={{ flex: 1, padding: 6 }}
          />
          <button onClick={() => dispatch(applyCoupon(codeInput))}>套用</button>
          <button onClick={() => { setCodeInput(''); dispatch(clearCoupon()) }}>清除</button>
        </div>
        {coupon.error && <div style={{ color: 'red', marginTop: 6 }}>{coupon.error}</div>}
        {coupon.code && !coupon.error && (
          <div style={{ color: 'green', marginTop: 6 }}>已套用：{coupon.code}</div>
        )}
      </div>

      {/* Summary */}
      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <div>小計：<strong>{nt(subtotal)}</strong></div>
        <div>折扣：<strong>- {nt(discount)}</strong></div>
        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>
          合計：{nt(total)}
        </div>
      </div>
    </div>
  )
}
