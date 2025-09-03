import { useGetProductsQuery } from '../features/products/productsApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { nt } from '../utils/format'
import { Link } from 'react-router-dom'

export default function ProductList() {
  const { data, isLoading, isError } = useGetProductsQuery()
  const dispatch = useDispatch()

  if (isLoading) return <p style={{ padding: 16 }}>Loading products...</p>
  if (isError) return <p style={{ padding: 16, color: 'red' }}>Failed to load products.</p>

  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', padding: 16 }}>
      {data?.map(p => (
        <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={p.thumbnail} alt={p.title} style={{ width: '100%', borderRadius: 6, objectFit: 'cover' }} />
            <h3 style={{ margin: '8px 0' }}>{p.title}</h3>
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{nt(p.price)}</span>
            <button onClick={() => dispatch(addToCart(p))}>加入購物車</button>
          </div>
        </div>
      ))}
    </div>
  )
}
