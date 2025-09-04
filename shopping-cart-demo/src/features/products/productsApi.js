// src/features/products/productsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }), // 指向 Flask 假後台
  tagTypes: ['Products', 'Orders'],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProductById: build.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Products'],
    }),
    getOrders: build.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
} = productsApi
