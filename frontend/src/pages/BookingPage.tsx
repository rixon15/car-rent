import React, {useEffect, useState} from "react";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import {SECURITY} from "../constants/svgPath";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import toast, {Toaster} from "react-hot-toast";
import {useAuthStore} from "../store/authStore.ts";

interface IclientInfo {
    name: string;
    phoneNumber: string;
    address: string;
    pickupDate: Date;
    pickupTime: string;
    dropoffDate: Date;
    dropoffTime: string;
    marketing: boolean;
    termsAndCondition: boolean;
}

interface IcarInfo {
    _id: string;
    name: string;
    description: string;
    image: string;
    type: string;
    capacity: number;
    transmission: string;
    fuelCapacity: number;
    price: number;
    views: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const handleSubmit = async (
    e: React.FormEvent<HTMLButtonElement>,
    carId: string,
    userId: string,
    clientInfo: IclientInfo
) => {
    e.preventDefault();

    const bookingInfo = {
        ...clientInfo,
        carId: carId,
        userId: userId,
    };

    await axios.post(`http://localhost:4004/booking/${carId}`, bookingInfo);
};

const checkCompletion = (clientInfo: IclientInfo) => {
    let result: boolean = false;

    if (
        clientInfo.name.length > 0 &&
        clientInfo.phoneNumber.length === 10 &&
        clientInfo.address.length > 0 &&
        clientInfo.pickupDate > new Date() &&
        clientInfo.dropoffDate > new Date() &&
        clientInfo.termsAndCondition
    ) {
        result = true;
    } else {
        result = false;
    }

    return result;
};

const BookingForm = () => {
    // const [errorMessage, setErrorMessage] = useState("");
    const [windowWidth, setWindowWidth] = useState(0);
    const [carInfo, setCarInfo] = useState<IcarInfo>();
    const [loading, setLoading] = useState(true);

    const {id} = useParams();
    const {user} = useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const fetchCarInfo = async () => {
            await axios
                .get(`http://localhost:4004/car/${id}`)
                .then((response) => setCarInfo(response.data))
                .catch((err) => {
                    console.error(err);
                });

            setLoading(false);
        };

        fetchCarInfo();
    }, [id]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [windowWidth]);

    const [clientInfo, setClientInfo] = useState<IclientInfo>({
        name: "",
        phoneNumber: "",
        address: "",
        pickupDate: new Date(),
        pickupTime: "10:00",
        dropoffDate: new Date(),
        dropoffTime: "10:00",
        marketing: false,
        termsAndCondition: false,
    });

    const carPriceString = carInfo?.price.toString()

    if (!loading) {
        return (
            <div className="container mx-auto">
                <Toaster position="top-center" reverseOrder={false}/>
                {/* Billing info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-3 gap-4 ">
                    <div className="bg-[#FFFFFF] rounded-lg p-8 sm:grid-row-2">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col">
                                <h1 className="font-bold text-xl">Billing Info</h1>
                                <p className="text-sm">Please enter your billing info</p>
                            </div>
                            <div>
                                <p className="text-sm">Step 1 of 4</p>
                            </div>
                        </div>
                        <form className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-y-5 sm:gap-y-0">
                            <div className="flex flex-col sm:mr-4 gap-y-4">
                                <label htmlFor="name" className="font-bold">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    placeholder="Your name"
                                    className="bg-[#F6F7F9] rounded-lg w-full h-14 text-center"
                                    onChange={(e) =>
                                        setClientInfo((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex flex-col sm:ml-4 gap-y-4">
                                <label
                                    htmlFor="phoneNumber"
                                    className="font-bold whitespace-nowrap"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    required
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    className="bg-[#F6F7F9] rounded-lg w-full h-14 text-center"
                                    onChange={(e) =>
                                        setClientInfo((prevState) => ({
                                            ...prevState,
                                            phoneNumber: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex flex-col sm:mt-6 gap-y-4">
                                <label htmlFor="address" className="font-bold">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    required
                                    placeholder="Address"
                                    className="bg-[#F6F7F9] rounded-lg h-14 text-center w-full mr-4 border-0"
                                    onChange={(e) =>
                                        setClientInfo((prevState) => ({
                                            ...prevState,
                                            address: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </form>
                    </div>
                    {/* Rental Info */}
                    <div className="col-start-1 row-start-3 sm:row-start-2 bg-[#FFFFFF] rounded-lg p-8">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col">
                                <h1 className="font-bold text-xl">Rental Info</h1>
                                <p className="text-sm">Please select your rental date</p>
                            </div>
                            <div>
                                <p className="text-sm">Step 2 of 4</p>
                            </div>
                        </div>
                        {/* Pickup */}
                        <p className="font-bold mt-8">Pick Up</p>
                        <form className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-y-5 sm:gap-y-0">
                            <div className="flex flex-col sm:mr-4 gap-y-4">
                                <label htmlFor="pickupDate" className="font-bold">
                                    Date
                                </label>
                                <DatePicker
                                    selected={clientInfo.pickupDate}
                                    onChange={(e) =>
                                        setClientInfo((prevState) => ({
                                            ...prevState,
                                            pickupDate: e as Date,
                                        }))
                                    }
                                    className="bg-[#F6F7F9] rounded-lg h-14 pl-8 w-full"
                                    name="pickupDate"
                                    id="pickupDate"
                                />
                            </div>
                            <div className="flex flex-col sm:ml-4 gap-y-4">
                                <label htmlFor="pickupTime" className="font-bold">
                                    Time
                                </label>
                                <TimePicker
                                    value={clientInfo?.pickupTime}
                                    onChange={(e) =>
                                        setClientInfo((prevState) => ({
                                            ...prevState,
                                            pickupTime: e as string,
                                        }))
                                    }
                                    disableClock={true}
                                    locale="sv-sv"
                                    name="pickupTime"
                                    id="pickupTime"
                                    className="bg-[#F6F7F9] rounded-lg h-14"
                                />
                            </div>
                        </form>
                        {/* Dropoff */}
                        <p className="font-bold mt-8">Drop off</p>
                        <form className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-y-5 sm:gap-y-0">
                            <div className="flex flex-col sm:mr-4 gap-y-4">
                                <label htmlFor="dropoffDate" className="font-bold">
                                    Date
                                </label>
                                <DatePicker
                                    selected={clientInfo.dropoffDate}
                                    onChange={(e) =>
                                        setClientInfo((prevState) => ({
                                            ...prevState,
                                            dropoffDate: e as Date,
                                        }))
                                    }
                                    className="bg-[#F6F7F9] rounded-lg h-14 pl-8 w-full"
                                    name="dropoffDate"
                                    id="dropoffDate"
                                />
                            </div>
                            <div className="flex flex-col sm:ml-4 gap-y-4">
                                <label htmlFor="dropoffTime" className="font-bold">
                                    Time
                                </label>
                                <TimePicker
                                    value={clientInfo.dropoffTime}
                                    onChange={(e) =>
                                        setClientInfo((prevState) => ({
                                            ...prevState,
                                            dropoffTime: e as string,
                                        }))
                                    }
                                    disableClock={true}
                                    locale="sv-sv"
                                    name="dropoffTime"
                                    id="dropoffTime"
                                    className="bg-[#F6F7F9] rounded-lg h-14"
                                />
                            </div>
                        </form>
                    </div>
                    {/* Confirmation */}
                    <div className="col-start-1 row-start-4 sm:row-start-3 h-full">
                        <div className="bg-[#FFFFFF] rounded-lg p-8 h-full">
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-xl">Confirmation</h1>
                                    <p className="text-sm max-w-[90%]">
                                        We are getting to the end. Just a few clicks and your rental
                                        is ready!
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm">Step 4 of 4</p>
                                </div>
                            </div>
                            <form className="grid grid-cols-1 mt-6 gap-y-6">
                                <div className="flex flex-row gap-x-[20px] bg-[#F6F7F9] p-4 rounded-lg">
                                    <input
                                        type="checkbox"
                                        name="marketing"
                                        id="marketing"
                                        className="size-6"
                                        onChange={() =>
                                            setClientInfo((prevState) => ({
                                                ...prevState,
                                                marketing: !clientInfo.marketing,
                                            }))
                                        }
                                    />
                                    <label htmlFor="marketing" className="font-bold float-start ">
                                        I agree with receiving Marketing and newsletter emails
                                    </label>
                                </div>
                                <div className="flex flex-row gap-x-[20px] bg-[#F6F7F9] p-4 rounded-lg">
                                    <input
                                        type="checkbox"
                                        name="termsAndConditions"
                                        id="termsAndConditions"
                                        className="size-6"
                                        required
                                        onChange={() => {
                                            setClientInfo((prevState) => ({
                                                ...prevState,
                                                termsAndCondition: !clientInfo.termsAndCondition,
                                            }));
                                            console.log(carInfo);
                                        }}
                                    />
                                    <label
                                        htmlFor="termsAndConditions"
                                        className="font-bold float-start "
                                    >
                                        I agree with the terms and conditions and privacy policy
                                    </label>
                                </div>
                                <button
                                    className="w-[140px] h-14 rounded-lg bg-[#3563E9] text-[#FFFFFF]"
                                    onClick={(e) => {
                                        handleSubmit(e, id as string, user._id, clientInfo);
                                        if (checkCompletion(clientInfo)) {
                                            navigate(`../payment/${id}`);
                                        } else {
                                            toast.error("Please fill out all the fields!");
                                        }
                                    }}
                                >
                                    Rent Now
                                </button>
                            </form>
                            <div className="flex flex-col mt-8 gap-y-4">
                                <img src={SECURITY} alt="security logo" className="size-8"/>
                                <div className="flex flex-col gap-y-2">
                                    <p className="font-bold">All your data is safe</p>
                                    <p className="text-sm text-gray-400">
                                        We are using the most advanced security to provide you the
                                        best experience ever.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Rental Summary */}
                    <div className="sm:row-span-4 sm:col-start-2  row-start-1 w-full sm:max-w-[500px] ">
                        <div className="bg-[#FFFFFF] p-6 rounded-xl  h-full sm:h-1/4 min-h-[550px]">
                            <div className="flex flex-col gap-y-8 h-full ">
                                <h1 className="text-xl font-bold mb-1">Rental Summary</h1>
                                <p className="text-sm text-gray-300">
                                    Prices may change depending on the length of the rental and
                                    the price of your rental car.
                                </p>
                                <div className="flex flex-row gap-x-4 items-center">
                                    <img
                                        src={carInfo?.images[0]}
                                        alt="car Image"
                                        className="max-w-32 max-h-28 bg-blue-500 rounded-md"
                                    />
                                    <div className="flex flex-col">
                                        <p
                                            className={`${
                                                windowWidth <= 640 ? "text-xl" : ""
                                            } md:text-xl lg:text-4xl font-bold`}
                                        >
                                            {carInfo?.name}
                                        </p>
                                    </div>
                                </div>
                                <span className="border-y-[1px]"></span>
                                <div className="flex flex-col gap-y-6">
                                    <div className="flex flex-row justify-between">
                                        <p>Subtotal</p>
                                        <p className="font-bold">{`$${carPriceString?.slice(0, carPriceString?.length - 2)}.${carPriceString?.slice(carPriceString?.length - 2, carPriceString?.length)}`}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center rounded-lg gap-x-8 gap-y-4 relative h-14">
                                    <input
                                        type="text"
                                        className="bg-[#F6F7F9] w-full rounded-lg  pl-8 h-14"
                                        placeholder="Apply promo code"
                                    />
                                    <button
                                        className="absolute font-semibold text-black float-end right-0 text-center h-14 mr-8">
                                        Apply Now
                                    </button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col gap-y-1">
                                        <p className="font-bold">Total Rent Price</p>
                                        <p className="text-sm text-gray-400">
                                            Overall price and includes rental discount
                                        </p>
                                    </div>
                                    <p className="text-3xl font-bold">
                                        ${`${carPriceString?.slice(0, carPriceString?.length - 2)}.${carPriceString?.slice(carPriceString?.length - 2, carPriceString?.length)}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default BookingForm;
