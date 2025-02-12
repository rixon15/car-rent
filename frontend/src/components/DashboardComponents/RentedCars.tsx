import {useEffect, useState} from "react";
import API from "../../config/apiClient.ts";
import BookingCard from "./BookingCard";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/authStore.ts";


const RentedCars = (props) => {

    const [carList, setCarList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useAuthStore();

    const nav = useNavigate();


    useEffect(() => {

        setIsLoading(true)


        const fetchCars = async (bookings: object) => {

            bookings?.map(async (booking: object) => {
                await API.get(`car/${booking.carId}`).then((response) => setCarList((prevState => [...prevState, response]))).catch((error) => console.log(error));
            })

            setIsLoading(false)
        }

        fetchCars(user.bookings);

        setIsLoading(false);

    }, []);

    if (user !== null && carList !== null && !isLoading) {

        console.log(carList);

        return (
            <div className="w-full flex flex-col bg-gray-300 justify-start items-center pt-12 px-6 pb-12 gap-y-4">
                {carList.map((carData, index) => {
                    return BookingCard(carData, user, index, nav)
                })}
            </div>
        )
    } else {
        return (
            <div className="w-full flex flex-col bg-gray-300 justify-start items-center pt-12 px-6 pb-12 gap-y-4">
                <h1 className="text-2xl font-bold text-black">You have no rents yet!</h1>
            </div>
        )
    }
}

export default RentedCars;