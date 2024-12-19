import API from "../../config/apiClient.ts";
import {useMutation} from "@tanstack/react-query";
import toast, {Toaster} from "react-hot-toast";

const handlePasswordReset = async (email) => {
    const res = await API.post('/auth/password/forgot', {email});

    return res;
}

const UserSettings = (props) => {

    const user = props.user;

    const {mutate: sendPasswordReset, error} = useMutation({
        mutationFn: handlePasswordReset,
        onError: () => {
            toast.error('Something went wrong')
        },
        onSuccess: () => {
            toast.success("Email sent! Check your inbox for further instructions.");
        }

    })

    return (
        <div className="w-full bg-gray-300 justify-start items-center pt-12 px-6 pb-12">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col gap-y-2 lg:items-start items-center">
                <div className="flex flex-row bg-white p-4 rounded-xl gap-x-4 w-full">
                    <p className="font-bold text-xl text-black">Email: </p>
                    <p className='text-md text-gray-400 text-xl'>{user.email}</p>
                </div>
                <div className="flex flex-row bg-white p-4 rounded-xl gap-x-4 w-full">
                    <p className="font-bold text-xl text-black">Phone Number: </p>
                    <p className='text-md text-gray-400 text-xl'>{user.phoneNumber}</p>
                </div>
                <div className="flex flex-row bg-blue-500 p-4 rounded-xl gap-x-4 ">
                    <p className="font-bold text-xl text-white cursor-pointer" onClick={() => sendPasswordReset(user.email)}>Reset Password</p>
                </div>
            </div>
        </div>
    )
}

export default UserSettings;