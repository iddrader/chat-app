import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IOpenedChat } from "../types";

const initialState: IOpenedChat = {
    id: "",
    created_at: "",
    messages: [],
};

const openedChatSlice = createSlice({
    name: "openedChat",
    initialState,
    reducers: {
        setOpenedChat: (state, action: PayloadAction<IOpenedChat>) => {
            state = action.payload;
        },
    },
});

export const { setOpenedChat } = openedChatSlice.actions;
export default openedChatSlice.reducer;
