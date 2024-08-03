import { createClient } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCustomUser, setSession } from "./slices/sessionSlice";
import { RootState } from "./store";
import { ICustomUser } from "./types";

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
        .upload(avatar.name, avatar);
    await supabase
        .from("customUser")
        .insert({ userID: id, username: username, avatar: data?.fullPath });
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
        .from("customUser")
        .select()
        .eq("userID", id);

    if (error) {
        toast.error(error.message);
        return null;
    } else return data[0];
};

export default supabase;
