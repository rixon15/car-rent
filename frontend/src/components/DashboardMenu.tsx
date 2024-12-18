import {useAuthStore} from "../store/authStore.ts";

const DashboardMenu = (props) => {

    const setTab = props.setTab
    const tab = props.tab
    const {logout} = useAuthStore();

    console.log(tab)

    return (
        <ul className={'space-y-8'}>
            <li className={`p-4 font-semibold ${tab === 0 ? 'bg-blue-500 text-white' : 'text-gray-500'} rounded-xl lg:text-start text-center`}>
                <p className={`cursor-pointer`} onClick={() => setTab(0)}>Dashboard</p>
            </li>
            <li className={`p-4 font-semibold ${tab === 1 ? 'bg-blue-500 text-white' : 'text-gray-500'} rounded-xl lg:text-start text-center`}>
                <p className={'cursor-pointer'} onClick={() => setTab(1)}>Rented Cars</p>
            </li>
            <li className={`p-4 font-semibold ${tab === 2 ? 'bg-blue-500 text-white' : 'text-gray-500'} rounded-xl lg:text-start text-center`}>
                <p className={'cursor-pointer'} onClick={() => setTab(2)}>Settings</p>
            </li>
            <li className={'p-4'}>
                <p className={'text-gray-500 cursor-pointer font-semibold lg:text-start text-center'} onClick={logout}>Logout</p>
            </li>
        </ul>
    )
}

export default DashboardMenu;