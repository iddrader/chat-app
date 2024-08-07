import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { ICustomUser, ISessionStore } from "../types";
import { getCurrentCustomUser } from "../supabase";

const initialState: ISessionStore = {
    value: null,
    customUser: null,
};

// Set initial custom user based on authenticatied user ID
if (initialState.value)
    initialState.customUser = await getCurrentCustomUser(
        initialState.value?.user.id
    );

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session | null>) => {
            state.value = action.payload;
        },
        setCustomUser: (state, action: PayloadAction<ICustomUser | null>) => {
            state.customUser = action.payload;
        },
    },
});

export const { setSession, setCustomUser } = sessionSlice.actions;
export default sessionSlice.reducer;
