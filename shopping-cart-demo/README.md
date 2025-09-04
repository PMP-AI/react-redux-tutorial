📄 README.md

# React Redux Shopping Cart Demo

一個使用 **React + Redux Toolkit + RTK Query** 建立的購物車範例，後端以 `json-server` 模擬 API。  
此專案展示了 Redux 在狀態管理、全域共享、API 整合與資料永久化的應用。  

---

## 功能特色
- **商品清單**：從假後端 API 讀取商品並顯示。
- **加入購物車**：商品可加入購物車，數量自動累加。
- **購物車頁面**：
  - 修改數量 / 移除商品 / 清空購物車
  - 顯示小計、折扣、合計
  - 支援折扣碼：`SAVE100`（折 100）、`OFF10`（九折）
- **產品詳情頁**：點擊商品圖片或名稱可進入 `/product/:id` 查看單品詳情。
- **Navbar 購物車按鈕**：隨時查看購物車數量，並可跳轉到 `/cart` 獨立頁。
- **永久化存儲**：使用 `redux-persist`，購物車與折扣碼會保存到 localStorage。
- **訂單功能**：  
  - 在購物車頁送出訂單 (POST /orders)  
  - 送出成功後自動導向 `/orders` 顯示所有歷史訂單 (GET /orders)

---

## 技術棧
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router](https://reactrouter.com/)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [json-server](https://github.com/typicode/json-server)（假後端 API）

---

## 專案架構



src/
├─ app/ # Redux store
├─ components/ # Navbar, Cart, ProductList 等元件
├─ features/ # Redux slice (cart, coupon, products)
├─ pages/ # Page components (ProductDetail, CartPage, OrdersPage)
├─ utils/ # 工具函式 (金額格式化)
├─ App.jsx # Route 定義
└─ main.jsx # 入口
db.json # 假後端資料


---

## Redux Toolkit 狀態管理
- **cartSlice**：管理購物車
  - `addToCart`, `removeFromCart`, `changeQty`, `clearCart`
- **couponSlice**：管理折扣碼
  - `applyCoupon`
- **Selectors**
  - `selectCartCount`：計算購物車商品數量
  - `selectSubtotal`：計算小計金額
- **Store**
  - 使用 `configureStore` + `redux-persist`，保存購物車與折扣碼到 `localStorage`

---

## RTK Query API
- **productsApi**
  - `useGetProductsQuery()` → 取得商品清單
  - `useGetProductByIdQuery(id)` → 取得單一商品詳情
  - `useCreateOrderMutation()` → 建立訂單 (POST `/orders`)
  - `useGetOrdersQuery()` → 取得訂單列表 (GET `/orders`)
- **後端**
  - 由 `json-server` 模擬
  - `db.json` 包含 `products` 與 `orders`

---

## 頁面流程
1. `/` (首頁)：顯示商品清單 + 小購物車區塊
2. `/product/:id`：單一商品詳情
3. `/cart`：檢視購物車，可修改數量、清空、套用折扣碼，並送出訂單
4. `/orders`：顯示所有送出的訂單

完整流程：  
**瀏覽商品 → 加入購物車 → 套用折扣碼 → 送出訂單 (POST) → 查看訂單列表 (GET)** ✅

---

## 安裝與執行

### Clone 專案
```bash
git clone https://github.com/你的帳號/react-redux-tutorial.git
cd react-redux-tutorial/shopping-cart-demo

安裝依賴
npm install

啟動假後端
npm run server


後端預設在 http://localhost:3001/products 提供 API

啟動前端
npm run dev


前端預設在 http://localhost:5173

範例折扣碼

SAVE100 → 折抵 100 元

OFF10 → 打九折