import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import NavbarAuth from "../components/sharedComponents/NavbarAuth.tsx";
import Footer from "../components/sharedComponents/Footer.tsx";
import NavbarNoAuth from "../components/sharedComponents/NavbarNoAuth.tsx";

const Layout = ({children}) => {

    const [user, setUser] = useState({user: null});
    const [isLoading, setIsLoading] = useState(true);

    console.log(children)

    useEffect(() => {
        setIsLoading(true);

        const fetchUsers = async () => {
            // const user = await API.get("/user");

            // setUser(user);
            setIsLoading(false);

        }

        fetchUsers();

    }, []);

    if (!isLoading) {
        return (
            <>
                <div className="bg-white">
                    <div className="container px-2 sm:mx-auto">
                        {user ? <NavbarAuth/> : <NavbarNoAuth/>}
                    </div>
                </div>
                <Outlet/>
                <>{children}</>
                <Footer/>
            </>
        )
    }
}