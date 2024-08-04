import { useEffect, useState } from "react";
import "../assets/scss/chatList.scss";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import supabase, { getAvatar, getCurrentChats } from "../supabase";
import { setChats } from "../slices/chatsSlice";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const userChats = useSelector((state: RootState) => state.chats.value);
    const dispatch = useDispatch();

    const handleInserts = async () => {
        dispatch(setChats(await getCurrentChats()));
        console.log("done");
    };

    useEffect(() => {
        supabase
            .channel("userChats")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "userChats" },
                handleInserts
            )
            .subscribe();
    }, []);

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img
                    src={addMode ? "minus.png" : "/plus.png"}
                    alt=""
                    className="add"
                    onClick={() => setAddMode((prevState) => !prevState)}
                />
            </div>
            {userChats?.map((chat) => (
                <div className="item">
                    <img src={getAvatar(chat.avatar)} alt="" />
                    <div className="texts">
                        <span>{chat.reciever}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
