import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './categorySlice'

export const store = configureStore({
    reducer : {
        categroy : categorySlice 
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch