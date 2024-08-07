import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IChatsList } from "../types";

const initialState: IChatsList = {
    value: undefined,
};

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<IChat[] | undefined>) => {
            state.value = action.payload;
        },
    },
});

export const { setChats } = chatsSlice.actions;
export default chatsSlice.reducer;
