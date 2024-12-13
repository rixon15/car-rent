import {useAuthStore} from "../store/authStore.ts";
import NavbarAuth from "../components/sharedComponents/NavbarAuth.tsx";
import Footer from "../components/sharedComponents/Footer.tsx";

const DashboardPage = () => {

    const {user} = useAuthStore();

    return (
        <>
            <NavbarAuth/>
            {/*Sidebar*/}
            {/*Content*/}
            <Footer/>
        </>
    )
}

export default DashboardPage