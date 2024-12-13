import {Navigate, Outlet} from "react-router-dom";
import {useAuthStore} from "../store/authStore.ts";

const AppContainer = () => {
    const {user} = useAuthStore();

    return (
        user ? (
            <>
                <Outlet/>
            </>
        ) : (
            <Navigate to={"/login"} replace state={{redirectURL: window.location.pathname}}/>
        )
    )
};

export default AppContainer;
