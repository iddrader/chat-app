import { ChangeEvent, FormEventHandler, useState } from "react";
import "../assets/scss/login.scss";
import { IAvatarState } from "../types";
import { toast } from "react-toastify";

const Login = () => {
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

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.warn("hello");
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
                <form>
                    <label htmlFor="file">
                        <img src={avatar.imageURL || "/avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input
                        type="file"
                        id="file"
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
