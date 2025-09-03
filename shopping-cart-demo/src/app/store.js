// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

// 路徑要回到上一層 ../features/...
import cartReducer from '../features/cart/cartSlice.js'
import couponReducer from '../features/coupon/couponSlice.js'
import { productsApi } from '../features/products/productsApi.js'

const rootReducer = combineReducers({
  cart: cartReducer,
  coupon: couponReducer,
  [productsApi.reducerPath]: productsApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'coupon'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gdm) =>
    gdm({ serializableCheck: false }).concat(productsApi.middleware),
})

export const persistor = persistStore(store)
