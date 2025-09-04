import { useSelector } from 'react-redux'
import { selectCartCount } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const count = useSelector(selectCartCount)
  return (
    <nav style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <strong>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>🛒 Shopping Cart Demo</Link>
      </strong>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          購物車 ({count})
        </Link>
        <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
          訂單列表
        </Link>
      </div>
    </nav>
  )
}
