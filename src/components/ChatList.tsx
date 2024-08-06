import { useEffect, useState } from "react";
import "../assets/scss/chatList.scss";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import supabase, { getAvatar, getCurrentChats } from "../supabase";
import { setChats } from "../slices/chatsSlice";
import { IChat } from "../types";
import { v4 as uuidv4 } from "uuid";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const userChats = useSelector((state: RootState) => state.chats.value);
    // const openedChat = useSelector((state: RootState) => state.openedChat);
    const dispatch = useDispatch();

    const handleUserChatsUpdate = async () => {
        dispatch(setChats(await getCurrentChats()));
    };

    const handleChatOpen = async (chat: IChat) => {
        // TODO open chat
        // const {data, error} =
    };

    useEffect(() => {
        supabase
            .channel("userChats")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "userChats" },
                handleUserChatsUpdate
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
                <div
                    className="item"
                    onClick={() => handleChatOpen(chat)}
                    key={uuidv4()}
                >
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
