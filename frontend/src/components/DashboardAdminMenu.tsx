import {useAuthStore} from "../store/authStore.ts";

const DashboardAdminMenu = (props) => {

    const setTab = props.setTab
    const tab = props.tab;
    const {logout} = useAuthStore();

    return (
        <ul className={'gap-y-8'}>
            <li className={`p-4 font-semibold ${tab === 3 ? 'bg-blue-500 text-white' : 'text-gray-500'} rounded-xl`}>
                <p className={'cursor-pointer'} onClick={() => setTab(3)}>Add Cars</p>
            </li>
            <li className={`p-4 font-semibold ${tab === 4 ? 'bg-blue-500 text-white' : 'text-gray-500'} rounded-xl`}>
                <p className={'cursor-pointer'} onClick={() => setTab(4)}>All Cars</p>
            </li>
            <li className={`p-4 font-semibold ${tab === 5 ? 'bg-blue-500 text-white' : 'text-gray-500'} rounded-xl`}>
                <p className={'cursor-pointer'} onClick={() => setTab(5)}>Reservations</p>

            </li>
            <li className={'p-4'}>
                <p className={'text-gray-500 font-semibold cursor-pointer'} onClick={logout}>Logout</p>
            </li>
        </ul>
    )

}

export default DashboardAdminMenu;