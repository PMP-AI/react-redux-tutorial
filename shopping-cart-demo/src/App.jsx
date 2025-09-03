import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProductList />
              <Cart /> {/* 首頁保留小購物車 */}
            </>
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  )
}
