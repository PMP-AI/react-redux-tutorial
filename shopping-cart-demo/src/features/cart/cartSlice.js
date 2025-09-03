import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  items: [] // [{id, title, price, thumbnail, qty}]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload
      const found = state.items.find(i => i.id === p.id)
      if (found) {
        found.qty += 1
      } else {
        state.items.push({ ...p, qty: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(i => i.id !== id)
    },
    changeQty: (state, action) => {
      const { id, qty } = action.payload
      const it = state.items.find(i => i.id === id)
      if (it) it.qty = Math.max(1, qty)
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions
export default cartSlice.reducer

// selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, i) => sum + i.qty, 0)
)
export const selectSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, i) => sum + i.qty * i.price, 0)
)
