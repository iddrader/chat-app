import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { IChat, ICustomUser } from "./types";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);

export const createCustomUser = async (
    id: string,
    username: string,
    avatar: File
) => {
    const { data, error } = await supabase.storage
        .from("storage")
        .upload(uuidv4(), avatar);
    await supabase
        .from("customUsers")
        .insert({ id: id, username: username, avatar: data?.fullPath })
        .then(({ error }) => console.log(error));
    error && toast.error(error.message);
};

export const getCurrentSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    error && toast.error(error.message);

    return data.session;
};

export const getCurrentCustomUser = async (
    id: string | null
): Promise<ICustomUser | null> => {
    const { data, error } = await supabase
        .from("customUsers")
        .select()
        .eq("id", id);

    if (error) {
        toast.error(error.message);
        return null;
    } else return data[0];
};

export const getAvatar = (path: string | null | undefined) => {
    if (path) {
        const { data } = supabase.storage.from("").getPublicUrl(path);
        return data.publicUrl;
    } else return "./avatar.png";
};

export const getCurrentChats = async (): Promise<IChat[] | undefined> => {
    const session = await getCurrentSession();

    const { data, error } = await supabase
        .from("userChats")
        .select()
        .eq("id", session?.user.id);
    error && toast.error(error.message);

    if (data?.length == 0 || !data) return;
    if (data[0].chats === null) return [];

    const chatPromises = await data[0].chats.map(async (chat: IChat) => {
        const { data, error } = await supabase
            .from("customUsers")
            .select("username, avatar")
            .eq("id", chat.recieverId);
        error && toast.error(error.message);

        if (!data) return;

        const item = {
            ...chat,
            reciever: data[0].username,
            avatar: data[0].avatar,
        };
        return item;
    });

    const response = await Promise.all(chatPromises);
    return response;
};

export default supabase;
