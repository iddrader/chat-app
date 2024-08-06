import { ChangeEvent, useState } from "react";
import "../assets/scss/login.scss";
import { IAvatarState } from "../types";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import supabase, {
    createCustomUser,
    createUserChats,
    getCurrentCustomUser,
} from "../supabase";
import { setCustomUser, setSession } from "../slices/sessionSlice";

const Login = () => {
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState<IAvatarState>({
        file: null,
        imageURL: "",
    });

    const handleAvatarChange = (event: ChangeEvent) => {
        const element = event.currentTarget as HTMLInputElement;
        element.files &&
            setAvatar({
                file: element.files[0],
                imageURL: URL.createObjectURL(element.files[0]),
            });
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email.value,
            password: form.password.value,
        });

        error && toast.error("Wrong email or password");
        if (data) {
            dispatch(setSession(data.session));
            dispatch(
                setCustomUser(
                    await getCurrentCustomUser(data.session?.user.id || null)
                )
            );
        }
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        await supabase.auth
            .signUp({
                email: form.email.value,
                password: form.password.value,
            })
            .then(({ data, error }) => {
                data.user?.id &&
                    createCustomUser(
                        data.user?.id,
                        form.username.value,
                        form.avatar.files[0]
                    );
                createUserChats(data.user?.id);
                error && toast.error(error.message);
                dispatch(setSession(data.session));
            });
    };

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back!</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" name="email" />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <button>Sign in</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.imageURL || "/avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="avatar"
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                    />
                    <input type="email" placeholder="Email" name="email" />
                    <input type="text" placeholder="Username" name="username" />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <button>Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
