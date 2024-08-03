import { useState } from "react";
import "../assets/scss/chatList.scss";
import AddUser from "./AddUser";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getAvatar } from "../supabase";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const userChats = useSelector((state: RootState) => state.chats.value);

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
