import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthStore} from "../../store/authStore.ts";


const NavbarAuth = () => {

    const [searchParams, setsearchParams] = useState("");
    const navigate = useNavigate();

    const {logout, user} = useAuthStore();


    return (
        <nav className="bg-white">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-x-16">
                    <Link
                        to={"/"}
                        className="uppercase text-5xl text-blue-500 flex items-center justify-center"
                    >
                        morent
                    </Link>
                    <div
                        className="border-blue-600 focus-within:border-none focus-within:ring focus-within:ring-offset-2 my-10  h-10 items-center justify-start border-2 leading-4 ring-blue-600 sm:w-96 rounded-full hidden md:flex">
                        <input
                            placeholder="Search"
                            className="peer ml-2 flex-grow bg-transparent text-gray-500 outline-none"
                            onChange={(e) => setsearchParams(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") {
                                    navigate(`/cars?searchParams=${searchParams}`);
                                    window.location.reload(true);
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="peer-focus:mr-2 z-20 cursor-pointer text-blue-600 outline-none duration-150 hover:scale-125"
                            onClick={() => {
                                if (searchParams === "") {
                                    navigate("/cars")
                                } else {
                                    navigate(`/cars?searchParams=${searchParams}`)
                                }

                                window.location.reload(true);
                            }

                            }
                        >
                            <svg className="h-6 w-6 stroke-2" viewBox="0 0 32 32" fill="none">
                                <circle
                                    cx="15"
                                    cy="14"
                                    r="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                ></circle>
                                <line
                                    x1="21.1514"
                                    y1="19.7929"
                                    x2="26.707"
                                    y2="25.3484"
                                    stroke="currentColor"
                                    fill="transparent"
                                ></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-x-5">
                    <Link to={`/${user?._id}/dashboard`}>
                        {user?.profilePhoto ? (
                            <img
                                src={`${user?.profilePhoto}`}
                                alt="profile photo"
                                className="text-black size-11  rounded-full "
                            />
                        ) : (
                            <div
                                className="text-black size-11  rounded-full flex items-center justify-center bg-blue-500 uppercase text-3xl">
                                {user?.email.slice(0, 1)}
                            </div>
                        )}
                    </Link>
                    <p className="hidden lg:block" onClick={logout}>Log Out</p>
                </div>
            </div>
        </nav>
    );
};

export default NavbarAuth;
