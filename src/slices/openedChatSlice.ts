import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IOpenedChat } from "../types";

const initialState = {
    value: undefined,
};

const openedChatSlice = createSlice({
    name: "openedChat",
    initialState,
    reducers: {
        setOpenedChat: (state, action: PayloadAction<IOpenedChat>) => {
            state.value = action.payload;
        },
    },
});

export const { setOpenedChat } = openedChatSlice.actions;
export default openedChatSlice.reducer;
