import { useSelector } from "react-redux";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { RootState } from "./store";

function App() {
    const session = useSelector((state: RootState) => state.session.value);

    return (
        <div className="container">
            {session ? (
                <>
                    <List />
                    <Chat />
                    <Detail />
                </>
            ) : (
                <Login />
            )}
            <Notification />
        </div>
    );
}

export default App;
