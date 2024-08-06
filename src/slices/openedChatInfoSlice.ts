import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOpenedChat, IOpenedChatStore } from "../types";

const initialState: IOpenedChatStore = {
    value: undefined,
};

const openedChatInfoSlice = createSlice({
    name: "openedChat",
    initialState,
    reducers: {
        setOpenedChatInfo: (state, action: PayloadAction<IOpenedChat>) => {
            state.value = action.payload;
        },
    },
});

export const { setOpenedChatInfo } = openedChatInfoSlice.actions;
export default openedChatInfoSlice.reducer;
