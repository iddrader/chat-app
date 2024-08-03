import { ReactNode, useState } from "react";
import "../assets/scss/chatList.scss";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { IChat } from "../types";
import supabase from "../supabase";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const user = useSelector((state: RootState) => state.session.customUser);
    const userChats = useSelector((state: RootState) => state.chats.value);
    const dispatch = useDispatch();

    console.log(userChats);

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
                    <img src="/avatar.png" alt="" />
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
