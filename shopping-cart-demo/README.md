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

---

## 技術棧
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router](https://reactrouter.com/)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [json-server](https://github.com/typicode/json-server)（假後端 API）

---

## 專案結構


src/
├─ app/ # Redux store
├─ components/ # Navbar, Cart, ProductList 等元件
├─ features/ # Redux slice (cart, coupon, products)
├─ pages/ # Page components (ProductDetail, CartPage)
├─ utils/ # 工具函式 (金額格式化)
├─ App.jsx # Route 定義
└─ main.jsx # 入口
db.json # 假後端資料


---

## 安裝與執行

#Clone 專案
```bash
git clone https://github.com/你的帳號/react-redux-tutorial.git
cd react-redux-tutorial/shopping-cart-demo

#安裝依賴
npm install

#啟動假後端
npm run server
後端預設會在 http://localhost:3001/products
提供 API。

#啟動前端
npm run dev
前端預設在 http://localhost:5173

#範例折扣碼
SAVE100 → 折抵 100 元
OFF10 → 打九折