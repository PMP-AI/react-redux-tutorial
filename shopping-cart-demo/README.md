# React Redux Shopping Cart Demo

一個使用 **React + Redux Toolkit + RTK Query** 建立的購物車範例。  
後端提供兩種做法：
- ✅ **Python Flask 假後台（推薦）**：可控制延遲、完整請求/回應日誌、更貼近真實情境。
- ⛳ `json-server`（備用）：快速，但較難客製行為與日誌。

此專案展示 Redux 在 **狀態管理**、**全域共享**、**API 整合** 與 **資料永久化** 的應用，並示範如何以**可控後端延遲**測試 `RTK Query` 的 `isLoading`/`isFetching`。

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
- **永久化存儲**：`redux-persist` 將購物車與折扣碼保存到 `localStorage`。
- **訂單功能**：  
  - 在購物車頁送出訂單 (POST `/orders`)  
  - 送出成功後自動導向 `/orders` 顯示所有歷史訂單 (GET `/orders`)
- **可控延遲（Flask）**：透過環境變數 `DELAY_MS` 模擬網路延遲，輕鬆測 `isLoading`。

---

## 技術棧
- 前端
  - [React](https://react.dev/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
  - [React Router](https://reactrouter.com/)
  - [redux-persist](https://github.com/rt2zz/redux-persist)
- 後端（預設）
  - [Flask](https://flask.palletsprojects.com/) + [flask-cors](https://flask-cors.readthedocs.io/)
- 後端（備用）
  - [json-server](https://github.com/typicode/json-server)

---

## 專案架構

.
├─ backend/
│ ├─ server.py # Flask 假後台（可控延遲 + 詳細日誌）
│ └─ server.log # 後端請求/回應日誌（啟動後自動產生）
├─ db.json # 假後端資料（products / orders）
├─ src/
│ ├─ app/ # Redux store
│ ├─ components/ # Navbar, Cart, ProductList 等元件
│ ├─ features/ # Redux slice (cart, coupon, productsApi)
│ ├─ pages/ # Page components (ProductDetail, CartPage, OrdersPage)
│ ├─ utils/ # 工具函式（ex: 金額格式化）
│ ├─ App.jsx # Route 定義
│ └─ main.jsx # 入口（Provider / PersistGate / Router）
├─ package.json
└─ ...

markdown
複製程式碼

---

## Redux Toolkit 狀態管理
- **cartSlice**：`addToCart`, `removeFromCart`, `changeQty`, `clearCart`
- **couponSlice**：`applyCoupon`
- **Selectors**
  - `selectCartCount`：計算購物車商品數量
  - `selectSubtotal`：計算小計金額
- **Store**
  - `configureStore` + `redux-persist`（將 `cart` / `coupon` 保存到 `localStorage`）

---

## RTK Query API
- **productsApi**
  - `useGetProductsQuery()` → 取得商品清單
  - `useGetProductByIdQuery(id)` → 取得單一商品詳情
  - `useCreateOrderMutation()` → 建立訂單 (POST `/orders`)
  - `useGetOrdersQuery()` → 取得訂單列表 (GET `/orders`)
- **baseUrl**
  - 預設 `http://localhost:3001`
- **後端端點（Flask）**
  - `GET /health` → 健康檢查（回傳 `ok`）
  - `GET /products`
  - `GET /products/:id`
  - `GET /orders`
  - `POST /orders`（寫回 `db.json`）

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

### 1) 取得專案
```bash
git clone https://github.com/你的帳號/react-redux-tutorial.git
cd react-redux-tutorial/shopping-cart-demo
2) 安裝前端相依
bash
複製程式碼
npm install
3) 啟動「Flask 假後台」（推薦）
需要已安裝 Python（建議 3.9+）。第一次請先安裝套件：

bash
複製程式碼
# 建議使用虛擬環境（可略）
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install flask flask-cors
啟動（預設延遲 1200ms）：

bash
複製程式碼
npm run pyserver
自訂延遲（例如 2 秒）：

bash
複製程式碼
npm run pyserver:delay2s
# 等同於：DELAY_MS=2000 python backend/server.py
後端預設在 http://localhost:3001 提供 API
日誌可在終端或 backend/server.log 查看（含請求 body、狀態碼、耗時）

4) 啟動前端
bash
複製程式碼
npm run dev
# 預設 http://localhost:5173
5) 範例折扣碼
SAVE100 → 折抵 100 元

OFF10 → 打九折

（備用）使用 json-server 當後端
若不需可控延遲與日誌，也可用舊有方式：

bash
複製程式碼
npm run server
# 預設 http://localhost:3001
如何測試 isLoading / isFetching
Query（例如 useGetProductsQuery()）

首次掛載：isLoading === true（看得到載入畫面）

重新抓取（refetch / 視窗聚焦 / 標籤失效）：isFetching === true

Mutation（例如 useCreateOrderMutation()）

呼叫期間：isLoading === true（可將送出按鈕 disabled 並顯示「送出中…」）

建議：以 Flask 的 DELAY_MS 控制延遲；避免前端與後端雙重延遲疊加。

