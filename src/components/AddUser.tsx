import { useRef, useState } from "react";
import "../assets/scss/addUser.scss";
import supabase from "../supabase";
import { ISearchResultUser } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const getAvatar = (path: string | null | undefined) => {
    if (path) {
        const { data } = supabase.storage.from("").getPublicUrl(path);
        return data.publicUrl;
    } else return "./avatar.png";
};

const AddUser = () => {
    const user = useSelector((state: RootState) => state.session.customUser);
    const [searchResults, setSearchResults] = useState<ISearchResultUser[]>();
    const searchInput = useRef<HTMLInputElement>(null);

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from("customUsers")
            .select("id, username, avatar")
            .like("username", `%${searchInput.current?.value}%`);
        error && toast.error(error.message);
        setSearchResults(() => data as ISearchResultUser[]);
    };

    const handleAddUser = async (id: string | null) => {
        if (id === null) return;

        const { data, error } = await supabase
            .from("userChats")
            .select()
            .eq("id", user?.id);
        error && toast.error(error.message);

        const newChat = {
            chatId: uuidv4(),
            isSeen: "true",
            updatedAt: Date.now(),
            recieverId: id,
            lastMessage: "",
        };

        if (data?.length == 0) {
            const { error } = await supabase.from("userChats").insert({
                id: user?.id,
                chats: [newChat],
            });
            error && toast.error(error.message);
        } else if (data) {
            data[0].chats.push(newChat);
            const { error } = await supabase
                .from("userChats")
                .update({ chats: data[0].chats })
                .eq("id", user?.id);
            error && toast.error(error.message);
        }
    };

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    ref={searchInput}
                />
                <button>Search</button>
            </form>
            {searchResults &&
                searchResults.map((result) => (
                    <div className="user">
                        <div className="detail">
                            <img src={getAvatar(result.avatar)} alt="" />
                            <span>{result.username}</span>
                        </div>
                        <button onClick={() => handleAddUser(result.id)}>
                            Add User
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default AddUser;
