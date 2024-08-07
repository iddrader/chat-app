import { useDispatch, useSelector } from "react-redux";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { RootState } from "./store";
import { setCustomUser, setSession } from "./slices/sessionSlice";
import { getCurrentCustomUser, getCurrentSession } from "./supabase";
import { Dispatch } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";

const updateSession = async (dispatch: Dispatch) => {
    const currentSession = await getCurrentSession();
    dispatch(setSession(currentSession));
    return currentSession;
};

const updateCustomUser = async (
    dispatch: Dispatch,
    session: Session | null
) => {
    dispatch(
        setCustomUser(
            await getCurrentCustomUser(session ? session.user.id : null)
        )
    );
};

function App() {
    const session = useSelector((state: RootState) => state.session.value);
    const dispatch = useDispatch();

    useEffect(() => {
        updateSession(dispatch).then((currentSession) => {
            updateCustomUser(dispatch, currentSession);
        });
    }, []);

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
