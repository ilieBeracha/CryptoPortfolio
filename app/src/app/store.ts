import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import loaderSlice from './loaderSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        loader: loaderSlice
    }
})