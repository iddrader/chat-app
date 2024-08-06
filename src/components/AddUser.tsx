import { useRef, useState } from "react";
import "../assets/scss/addUser.scss";
import supabase from "../supabase";
import { IChat, ISearchResultUser } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { setChats } from "../slices/chatsSlice";

const getAvatar = (path: string | null | undefined) => {
    if (path) {
        const { data } = supabase.storage.from("").getPublicUrl(path);
        return data.publicUrl;
    } else return "./avatar.png";
};

const AddUser = () => {
    const user = useSelector((state: RootState) => state.session.customUser);
    const userChats = useSelector((state: RootState) => state.chats.value);
    const dispatch = useDispatch();
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

        const newUserChat: IChat = {
            chatId: uuidv4(),
            isSeen: "true",
            updatedAt: `${Date.now()}`,
            recieverId: id,
            lastMessage: "",
            reciever: "",
            avatar: "",
        };

        // to check if the userChats row exists for this user
        const { data, error } = await supabase
            .from("userChats")
            .select()
            .eq("id", user?.id);

        // add chat entry to user's chats list
        if (data?.length == 0) {
            const { error } = await supabase.from("userChats").insert({
                id: user?.id,
                chats: [newUserChat],
            });
            dispatch(setChats([newUserChat]));
            error && toast.error(error.message);
        } else if (userChats) {
            const { error } = await supabase
                .from("userChats")
                .update({ chats: [...userChats, newUserChat] })
                .eq("id", user?.id);
            error && toast.error(error.message);
            dispatch(setChats([...userChats, newUserChat]));
        }

        // create chats row for an opened chat with messages
        await supabase
            .from("chats")
            .insert({
                id: newUserChat.chatId,
                messages: [],
            })
            .then(({ error }) => toast.error(error?.message));
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
                    <div className="user" key={uuidv4()}>
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
