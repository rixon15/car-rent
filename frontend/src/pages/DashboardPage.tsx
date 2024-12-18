import {useAuthStore} from "../store/authStore.ts";
import NavbarAuth from "../components/sharedComponents/NavbarAuth.tsx";
import Footer from "../components/sharedComponents/Footer.tsx";
import {useState} from "react";
import DashboardAdminMenu from "../components/DashboardAdminMenu.tsx";
import DashboardMenu from "../components/DashboardMenu.tsx";
import Dashboard from "../components/DashboardComponents/Dashboard.tsx";
import RentedCars from "../components/DashboardComponents/RentedCars.tsx";
import UserSettings from "../components/DashboardComponents/UserSettings.tsx";

const renderSwitch = (tab: number, user) => {
    switch (tab) {
        case 0:
            return (<Dashboard/>);
            break;
        case 1:
            return (<RentedCars user={user}/>)
            break
        case 2:
            return (<UserSettings user={user}/>)
            break;

    }
}

const DashboardPage = () => {

    const [tab, setTab] = useState(0)
    const {user} = useAuthStore();

    return (
        <>
            <header>
                <div className="bg-white">
                    <div className="container px-2 sm:mx-auto">
                        <NavbarAuth/>
                    </div>
                </div>
            </header>
            <div className="flex flex-col lg:flex-row 2xl:justify-center 2xl:max-w-screen-2xl h-full mx-auto">
                {/*Sidebar*/}
                <div className="flex flex-col  bg-white border-gray-200 w-full lg:w-[240px] p-8 border-t">
                    <ul>
                        {user.role === "admin" ? <DashboardAdminMenu setTab={setTab} tab={tab}/> :
                            <DashboardMenu setTab={setTab} tab={tab}/>}
                    </ul>
                </div>
                {/*Content*/}
                {renderSwitch(tab, user)}
            </div>
            <div className="bg-white">
                <Footer/>
            </div>
        </>
    )
}

export default DashboardPage