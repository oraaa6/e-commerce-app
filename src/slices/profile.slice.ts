import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

type ProfileState = {
    name?: string;
    surname?: string;
    address?: string;
    postCode?: string;
}

const initialState: ProfileState = {
    name: '',
    surname: '',
    address: '',
    postCode: '',
}

export const profileSlice = createSlice({
    name: 'profile',

    initialState,
    reducers: {
        update: (state, action: PayloadAction<ProfileState>) => {
            state = { ...state, ...action.payload }
        },
    },
})

export const { update } = profileSlice.actions

export const profile = (state: RootState) => { return state }
export default profileSlice.reducer