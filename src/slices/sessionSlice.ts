import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { ISessionStore } from "../types";
import supabase from "../supabase";

const initialState: ISessionStore = {
    value: (await supabase.auth.getSession()).data.session,
};

const counterSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session | null>) => {
            state.value = action.payload;
        },
    },
});

export const { setSession } = counterSlice.actions;
export default counterSlice.reducer;
