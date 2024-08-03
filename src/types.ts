import { Session } from "@supabase/supabase-js";

export interface IAvatarState {
    file: File | null;
    imageURL: string;
}

export interface ISessionStore {
    value: Session | null;
}
