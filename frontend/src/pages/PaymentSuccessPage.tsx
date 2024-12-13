import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import API from "../config/apiClient.ts";
import {useAuthStore} from "../store/authStore.ts";

const PaymentSuccessPage = () => {

    const nav = useNavigate();
    const params = useParams();

    const {user} = useAuthStore();

    console.log(user);

    useEffect(() => {
        API.post(`booking/${params.id}/confirm`)
        setTimeout(() => nav(`/${user.id}/dashboard`), 5000);
    }, [])

    return (

        <div className="flex flex-row items-center justify-center  h-screen bg-gray-300">
            <div
                className="relative m-2 my-8 max-w-sm rounded-lg border border-gray-100 bg-white px-12 py-6 shadow-md">

                <p className="relative mb-1 text-sm font-medium">
        <span className="absolute -left-7 flex h-5 w-5 items-center justify-center rounded-xl bg-green-400 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="h-3 w-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
          </svg>
        </span>
                    <span className="text-gray-700">The payment was successfull!</span>
                </p>
                <p className="text-sm text-gray-600">You will be redirected in 5 seconds</p>
                <Link to={'/dashboard'} className="text-sm text-gray-600 flex items-center justify-center">Return</Link>
            </div>
        </div>
    )

}

export default PaymentSuccessPage;