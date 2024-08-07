import { Session } from "@supabase/supabase-js";

export interface IAvatarState {
    file: File | null;
    imageURL: string;
}

export interface IMessage {
    chatId: string;
    senderId: string;
    text: string;
    image: string | undefined;
    createdAt: string;
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
    chats_list: string[] | null;
    blocked: string[];
}

export interface ISearchResultUser {
    id: string | null;
    username: string | null;
    avatar: string | undefined;
}

export interface IChat {
    chatId: string;
    recieverId: string;
    reciever: string | undefined;
    lastMessage: string;
    updatedAt: string;
    isSeen: string;
    avatar: string;
}

export interface IChatsList {
    value: IChat[] | undefined;
}

export interface IOpenedChat {
    id: string;
    created_at: string;
    messages: IMessage[];
    recieverId: string;
    reciever: string | undefined;
    avatar: string;
}

export interface IOpenedChatStore {
    value: IOpenedChat | undefined;
}

export interface IOpenedChatInfo {
    avatar: string;
    description: string;
    messages: IMessage[];
}

export interface IOpenedChatInfoStore {
    value: IOpenedChatInfo | undefined;
}
