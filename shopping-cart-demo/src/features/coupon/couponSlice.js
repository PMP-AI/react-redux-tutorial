import { createSlice, createSelector } from '@reduxjs/toolkit'
import { selectSubtotal } from '../cart/cartSlice'

const initialState = {
  code: null,         // 目前使用中的折扣碼
  type: null,         // 'flat' | 'percent'
  value: 0,           // flat: 100; percent: 10 (=10%)
  error: null,
}

// 簡易的「可用折扣碼清單」：實務上會打 API
const COUPONS = {
  SAVE100: { type: 'flat', value: 100 },
  OFF10: { type: 'percent', value: 10 },
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      const code = action.payload?.trim().toUpperCase()
      const found = COUPONS[code]
      if (!found) {
        state.code = null
        state.type = null
        state.value = 0
        state.error = '折扣碼無效'
      } else {
        state.code = code
        state.type = found.type
        state.value = found.value
        state.error = null
      }
    },
    clearCoupon: (state) => {
      state.code = null
      state.type = null
      state.value = 0
      state.error = null
    },
  },
})

export const { applyCoupon, clearCoupon } = couponSlice.actions
export default couponSlice.reducer

// ---- selectors ----
export const selectCoupon = (s) => s.coupon
export const selectDiscount = createSelector(
  [selectSubtotal, selectCoupon],
  (subtotal, coupon) => {
    if (!coupon.code) return 0
    if (coupon.type === 'flat') return Math.min(coupon.value, subtotal)
    if (coupon.type === 'percent') return Math.round(subtotal * (coupon.value / 100))
    return 0
  }
)
export const selectTotal = createSelector(
  [selectSubtotal, selectDiscount],
  (subtotal, discount) => Math.max(0, subtotal - discount)
)
