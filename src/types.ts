import { Session } from "@supabase/supabase-js";

export interface IAvatarState {
    file: File | null;
    imageURL: string;
}

export interface ISessionStore {
    value: Session | null;
    customUser: ICustomUser | null;
}

export interface ICustomUser {
    id: string | null;
    created_at: string | null;
    username: string | null;
    userID: string | null;
    avatar: string | null;
    chats_list: number[] | null;
}

export interface IChat {
    chatId: string;
    recieverId: string;
    lastMessage: string;
    updatedAt: string[];
    isSeen: string[];
}

export interface IChatsList {
    value: IChat[] | undefined;
}
