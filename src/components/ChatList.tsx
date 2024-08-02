import { useState } from "react";
import "../assets/scss/chatList.scss";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);

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
            <div className="item">
                <img src="/avatar.png" alt="" />
                <div className="textContainer">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="" />
                <div className="textContainer">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="" />
                <div className="textContainer">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="" />
                <div className="textContainer">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
