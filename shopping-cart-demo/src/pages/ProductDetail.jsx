import { useParams, Link } from 'react-router-dom'
import { useGetProductByIdQuery } from '../features/products/productsApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { nt } from '../utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: p, isLoading, isError } = useGetProductByIdQuery(id)
  const dispatch = useDispatch()

  if (isLoading) return <p style={{ padding: 16 }}>Loading...</p>
  if (isError || !p) return <p style={{ padding: 16, color: 'red' }}>Product not found.</p>

  return (
    <div style={{ padding: 16, maxWidth: 920, margin: '0 auto' }}>
      <Link to="">{/* keep same page anchor */}</Link>
      <Link to="/" style={{ display: 'inline-block', marginBottom: 12 }}>← 回到商品列表</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <img src={p.thumbnail} alt={p.title} style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }} />
        <div>
          <h1 style={{ marginTop: 0 }}>{p.title}</h1>
          <div style={{ fontSize: 20, margin: '12px 0' }}>{nt(p.price)}</div>
          <button onClick={() => dispatch(addToCart(p))}>加入購物車</button>
        </div>
      </div>
    </div>
  )
}
