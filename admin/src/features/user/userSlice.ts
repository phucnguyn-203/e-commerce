import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../common/model";

interface UserState {
    userInfo?: User,
    isLogin: boolean,
    isLoading: boolean
    theme: string,
}

const initialState: UserState = {
    userInfo: undefined,
    isLogin: false,
    isLoading: true,
    theme: localStorage.getItem("theme") || "light"
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserSuccess: (state, action: PayloadAction<User>) => {
            state.isLogin = true;
            state.isLoading = false;
            state.userInfo = action.payload
        },
        setUserFail: (state) => {
            state.isLogin = false;
            state.isLoading = false;
            state.userInfo = undefined
        },
        logoutUser: (state) => {
            state.userInfo = undefined
        },
        changeTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        }
    }
})

export const { setUserSuccess, setUserFail, logoutUser, changeTheme } = userSlice.actions;
export default userSlice.reducer;