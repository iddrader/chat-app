import { useSelector } from "react-redux";
import "../assets/scss/userInfo.scss";
import { RootState } from "../store";
import supabase from "../supabase";

const getAvatar = (path: string | null | undefined) => {
    if (path) {
        const { data } = supabase.storage.from("").getPublicUrl(path);
        return data.publicUrl;
    } else return "./avatar.png";
};

const UserInfo = () => {
    const user = useSelector((state: RootState) => state.session.customUser);
    const avatar = getAvatar(user?.avatar);

    console.log(
        "https://bftmzcldxyigwpaphqik.supabase.co/storage/v1/object/public/storage/photo_2024-05-17_21-30-51.jpg"
    );
    console.log(avatar);

    return (
        <div className="userInfo">
            <div className="user">
                <img src={avatar} alt="" />
                <h2>John Doe</h2>
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
