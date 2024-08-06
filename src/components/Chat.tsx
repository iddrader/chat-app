import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "../assets/scss/chat.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Chat = () => {
    const [emojiOpened, setEmojiOpened] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const openedChat = useSelector(
        (state: RootState) => state.openedChat.value
    );

    const handleEmoji = (event: EmojiClickData) => {
        setMessageInput((prev) => prev + event.emoji);
    };

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView();
    }, [openedChat]);

    return (
        <div className="chat">
            {openedChat?.id && (
                <>
                    <div className="top">
                        <div className="user">
                            <img src="/avatar.png" alt="" />
                            <div className="texts">
                                <span>Jane Doe</span>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="icons">
                            <img src="/phone.png" alt="" />
                            <img src="/video.png" alt="" />
                            <img src="/info.png" alt="" />
                        </div>
                    </div>
                    <div className="center">
                        <div className="message">
                            <img src="/avatar.png" alt="" />
                            <div className="texts">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Exercitationem eveniet
                                    quasi in, molestiae eaque velit fugiat modi
                                    quaerat delectus inventore.
                                </p>
                                <span>10 min ago</span>
                            </div>
                        </div>
                        <div className="message own">
                            <div className="texts">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/036/431/995/small/ai-generated-colorful-starry-sky-with-sunset-background-in-anime-style-generative-ai-photo.jpg"
                                    alt=""
                                />
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Exercitationem eveniet
                                    quasi in, molestiae eaque velit fugiat modi
                                    quaerat delectus inventore.
                                </p>
                                <span>10 min ago</span>
                            </div>
                        </div>
                        <div className="message">
                            <img src="/avatar.png" alt="" />
                            <div className="texts">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Exercitationem eveniet
                                    quasi in, molestiae eaque velit fugiat modi
                                    quaerat delectus inventore.
                                </p>
                                <span>10 min ago</span>
                            </div>
                        </div>
                        <div className="message">
                            <img src="/avatar.png" alt="" />
                            <div className="texts">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Exercitationem eveniet
                                    quasi in, molestiae eaque velit fugiat modi
                                    quaerat delectus inventore.
                                </p>
                                <span>10 min ago</span>
                            </div>
                        </div>
                        <div className="message own">
                            <div className="texts">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Exercitationem eveniet
                                    quasi in, molestiae eaque velit fugiat modi
                                    quaerat delectus inventore.
                                </p>
                                <span>10 min ago</span>
                            </div>
                        </div>
                        <div ref={lastMessageRef}></div>
                    </div>
                    <div className="bottom">
                        <div className="icons">
                            <img src="/img.png" alt="" />
                            <img src="/camera.png" alt="" />
                            <img src="/mic.png" alt="" />
                        </div>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(event) =>
                                setMessageInput(() => event.target.value)
                            }
                        />
                        <div className="emoji">
                            <img
                                src="/emoji.png"
                                alt=""
                                onClick={() =>
                                    setEmojiOpened((prevState) => !prevState)
                                }
                            />
                            <div className="picker">
                                <EmojiPicker
                                    open={emojiOpened}
                                    onEmojiClick={handleEmoji}
                                />
                            </div>
                        </div>
                        <button className="sendButton">Send</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chat;
