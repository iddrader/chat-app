import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IOpenedChat, IOpenedChatStore } from "../types";

const initialState: IOpenedChatStore = {
    value: undefined,
};

const openedChatSlice = createSlice({
    name: "openedChat",
    initialState,
    reducers: {
        setOpenedChat: (
            state,
            action: PayloadAction<IOpenedChat | undefined>
        ) => {
            state.value = action.payload;
        },
        updateMessages: (state, action: PayloadAction<IMessage[]>) => {
            if (state.value) state.value.messages = action.payload;
        },
    },
});

export const { setOpenedChat, updateMessages } = openedChatSlice.actions;
export default openedChatSlice.reducer;
