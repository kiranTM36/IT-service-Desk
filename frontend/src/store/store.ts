import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './categorySlice'
import ticketSlice from './ticketSlice'
import userSlice from './userSlice'
import commentSlice from './commentSlice' 

export const store = configureStore({
    reducer : {
        categroy : categorySlice ,
        ticket : ticketSlice,
        user : userSlice ,
        comment : commentSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch