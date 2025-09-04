import { useGetOrdersQuery } from '../features/products/productsApi'
import { Link } from 'react-router-dom'
import { nt } from '../utils/format'

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useGetOrdersQuery()

  if (isLoading) return <p style={{ padding: 16 }}>載入中...</p>
  if (isError) return <p style={{ padding: 16, color: 'red' }}>讀取訂單失敗</p>

  return (
    <div style={{ padding: 16 }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: 12 }}>
        ← 回到商品列表
      </Link>
      <h2>訂單列表</h2>

      {orders?.length === 0 && <p>目前沒有訂單。</p>}

      <div style={{ display: 'grid', gap: 16 }}>
        {orders?.map((o) => (
          <div key={o.id} style={{ border: '1px solid #ddd', borderRadius: 6, padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>
              訂單編號 #{o.id} （{new Date(o.createdAt).toLocaleString()}）
            </div>
            <div>小計：{nt(o.subtotal)}</div>
            <div>折扣：- {nt(o.discount)}</div>
            <div style={{ fontWeight: 700 }}>總計：{nt(o.total)}</div>

            <ul style={{ marginTop: 8, paddingLeft: 20 }}>
              {o.items.map((it) => (
                <li key={it.id}>
                  {it.title} × {it.qty} = {nt(it.qty * it.price)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
