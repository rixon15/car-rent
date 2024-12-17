import {useAuthStore} from "../store/authStore.ts";
import NavbarAuth from "../components/sharedComponents/NavbarAuth.tsx";
import Footer from "../components/sharedComponents/Footer.tsx";
import {useState} from "react";
import DashboardAdminMenu from "../components/DashboardAdminMenu.tsx";
import DashboardMenu from "../components/DashboardMenu.tsx";
import Dashboard from "../components/DashboardComponents/Dashboard.tsx";
import RentedCars from "../components/DashboardComponents/RentedCars.tsx";

const renderSwitch = (tab:number, user) => {
    switch (tab) {
        case 0:
            return (<Dashboard/>);
            break;
        case 1:
            return (<RentedCars user={user}/>)
    }
}

const DashboardPage = () => {

    const [tab, setTab] = useState(0)
    const {user} = useAuthStore();

    return (
        <>
            <NavbarAuth/>
            <div className="flex flex-row w-full h-full">
                {/*Sidebar*/}
                <div className="flex flex-col  bg-white border-gray-200 w-[240px] p-8 border-t">
                    <ul>
                        {user.role === "admin" ? <DashboardAdminMenu setTab={setTab} tab={tab}/> :
                            <DashboardMenu setTab={setTab} tab={tab}/>}
                    </ul>
                </div>
                {/*Content*/}
                {renderSwitch(tab, user)}
            </div>
            <Footer/>
        </>
    )
}

export default DashboardPage