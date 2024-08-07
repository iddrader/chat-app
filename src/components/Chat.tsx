import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "../assets/scss/chat.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import supabase, { getAvatar } from "../supabase";
import { v4 as uuidv4 } from "uuid";
import { updateMessages } from "../slices/openedChatSlice";

const Chat = () => {
    const [emojiOpened, setEmojiOpened] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.session.customUser);
    const openedChat = useSelector(
        (state: RootState) => state.openedChat.value
    );

    const handleMessagesUpdate = async (data: any) => {
        dispatch(updateMessages(data.new.messages));
    };

    const handleEmoji = (event: EmojiClickData) => {
        setMessageInput((prev) => prev + event.emoji);
    };

    const convertMsToSeconds = (ms: number) => Math.floor(ms / 60000);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView();
        supabase
            .channel("chats")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "chats" },
                handleMessagesUpdate
            )
            .subscribe();
    }, [openedChat]);

    const handleNewMessage = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        // TODO set updatedAt for userChat (and new message indication)
        event.preventDefault();
        const element = event.currentTarget as HTMLFormElement;
        const time = Date.now();

        const { data, error } = await supabase
            .from("chats")
            .select()
            .eq("id", openedChat?.id);

        const newMessage = {
            chatId: openedChat?.id,
            senderId: user?.id,
            text: element.message.value,
            image: "",
            createdAt: time,
        };

        element.message.value = "";

        if (data) {
            await supabase
                .from("chats")
                .update({
                    messages: [...data[0].messages, newMessage],
                })
                .eq("id", openedChat?.id);
        }
    };

    return (
        <div className="chat">
            {openedChat?.id && (
                <>
                    <div className="top">
                        <div className="user">
                            <img src={getAvatar(openedChat.avatar)} alt="" />
                            <div className="texts">
                                <span>{openedChat.reciever}</span>
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
                        {openedChat.messages.map((message) => (
                            <div
                                className={
                                    message.senderId == user?.id
                                        ? "message own"
                                        : "message"
                                }
                                key={uuidv4()}
                            >
                                <div className="texts">
                                    {message.image && (
                                        <img
                                            src="https://static.vecteezy.com/system/resources/thumbnails/036/431/995/small/ai-generated-colorful-starry-sky-with-sunset-background-in-anime-style-generative-ai-photo.jpg"
                                            alt=""
                                        />
                                    )}
                                    <p>{message.text}</p>
                                    <span>
                                        {convertMsToSeconds(
                                            Date.now() - +message.createdAt
                                        ) + " min ago"}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={lastMessageRef}></div>
                    </div>
                    <form className="bottom" onSubmit={handleNewMessage}>
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
                            name="message"
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
                        <button className="sendButton" type="submit">
                            Send
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Chat;
