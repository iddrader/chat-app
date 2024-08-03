import { useSelector } from "react-redux";
import "../assets/scss/userInfo.scss";
import { RootState } from "../store";
import { getAvatar } from "../supabase";

const UserInfo = () => {
    const user = useSelector((state: RootState) => state.session.customUser);
    const avatar = getAvatar(user?.avatar);

    return (
        <div className="userInfo">
            <div className="user">
                <img src={avatar} alt="" />
                <h2>{user?.username}</h2>
            </div>
            <div className="icons">
                <img src="/more.png" alt="" />
                <img src="/video.png" alt="" />
                <img src="/edit.png" alt="" />
            </div>
        </div>
    );
};

export default UserInfo;
