import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "../slices/sessionSlice";
import chatsSlice from "../slices/chatsSlice";

export const store = configureStore({
    reducer: {
        session: sessionSlice,
        chats: chatsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
