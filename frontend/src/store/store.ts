import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './categorySlice'
import ticketSlice from './ticketSlice'

export const store = configureStore({
    reducer : {
        categroy : categorySlice ,
        ticket : ticketSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch