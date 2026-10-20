import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from './store'
import { status } from './status'
import axios from 'axios'

interface categoryData{
    id : number
    cName : string
}

interface categoryState{
    category : categoryData[],
    status : string
}

const initialState : categoryState = {
    category : [],
    status : ''
}

const categorySlice = createSlice({
    name : "category",
    initialState ,
    reducers : {
        setCategory(state , action : PayloadAction <categoryData[]>){
            state.category = action.payload
        },
        setStatus(state , action  : PayloadAction <string>){
            state.status = action.payload
        }
    }
})

export const { setStatus , setCategory } = categorySlice.actions
export default categorySlice.reducer

export function getAllCategory(){
    return async function getAllCategoryThunk(dispatch : AppDispatch){
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.get('http://localhost:5555/category')

            if(response.status === 200){
                dispatch(setCategory(response.data.data))
                dispatch(setStatus(status.SUCCESS))

                return true
            }
        } catch (error) {
            dispatch(setStatus(status.ERRROR))
            console.log(error);
        }
    }
}