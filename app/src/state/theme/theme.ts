import { createSlice } from "@reduxjs/toolkit";

export enum Theme{
    DARK,
    LIGHT
}

interface themeState {
    value: Theme,
}

const initialState: themeState = { value: Theme.DARK}


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            state.value = (state.value === Theme.DARK? Theme.LIGHT: Theme.DARK)
        }
    }
})

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
