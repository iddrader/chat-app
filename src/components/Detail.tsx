import { toast } from "react-toastify";
import "../assets/scss/detail.scss";
import supabase, { getAvatar } from "../supabase";
import { useDispatch, useSelector } from "react-redux";
import { setCustomUser, setSession } from "../slices/sessionSlice";
import { RootState } from "../store";
import { setOpenedChat } from "../slices/openedChatSlice";
import { setChats } from "../slices/chatsSlice";

const Detail = () => {
    const openedChat = useSelector(
        (state: RootState) => state.openedChat.value
    );
    const user = useSelector((state: RootState) => state.session.customUser);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) toast.error("Error logging out, please, try again");
        dispatch(setSession(null));
        dispatch(setCustomUser(null));
        dispatch(setOpenedChat(undefined));
        dispatch(setChats(undefined));
    };

    const handleBlock = async () => {
        if (!user || !openedChat) return;
        const { data, error } = await supabase
            .from("customUsers")
            .update({ blocked: [...user.blocked, openedChat?.recieverId] });
        error && toast.error(error.message);
    };

    return (
        <div className="detail">
            <div className="user">
                <img src={getAvatar(openedChat?.avatar)} alt="" />
                <h2>{openedChat?.reciever}</h2>
                <p>Lorem ipsum dolor, sit amet.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat settings</span>
                        <img src="/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="/arrowDown.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="/arrowUp.png" alt="" />
                    </div>
                    {/* <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/036/431/995/small/ai-generated-colorful-starry-sky-with-sunset-background-in-anime-style-generative-ai-photo.jpg"
                                    alt=""
                                />
                                <span>photo_07_03_2022.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/036/431/995/small/ai-generated-colorful-starry-sky-with-sunset-background-in-anime-style-generative-ai-photo.jpg"
                                    alt=""
                                />
                                <span>photo_07_03_2022.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/036/431/995/small/ai-generated-colorful-starry-sky-with-sunset-background-in-anime-style-generative-ai-photo.jpg"
                                    alt=""
                                />
                                <span>photo_07_03_2022.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon" />
                        </div>
                    </div> */}
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared files</span>
                        <img src="/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="buttonsContainer">
                    <button onClick={handleBlock}>Block User</button>
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Detail;
