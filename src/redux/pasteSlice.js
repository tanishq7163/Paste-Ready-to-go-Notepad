import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import {setItem} from 'react'

const initialState = {
    pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem("pastes")) 
    : []
}


export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state,action) => {
            const paste = action.payload;

            //addd a check -> pastes already exists

            state.pastes.push(paste) 
            localStorage.setItem("pastes",JSON.stringify(state.pastes))

            toast.success("Paste Created Successfully")

        },

        updateToPastes: (state,action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id===paste._id)
            
            if (index >= 0){
                state.pastes[index] = paste
                localStorage.setItem("pastes",JSON.stringify(state.pastes));
                toast.success("Paste Updates")
            }

        },

        resetAllPastes: (state,action) => {
            state.pastes = []
            localStorage.removeItem('pastes')
        },

        removeFromPastes: (state,action) => {
            const pasteId = action.payload
            const index = state.pastes.findIndex((item)=>item._id===pasteId);

            if(index>=0){
                state.pastes.splice(index,1);

                localStorage.setItem("pastes",JSON.stringify(state.pastes));
                toast.success("Paste Deleted")
            }

        },
    },
})

export const {addToPastes, updateToPastes,resetAllPastes,removeFromPastes} = pasteSlice.actions
export default pasteSlice.reducer