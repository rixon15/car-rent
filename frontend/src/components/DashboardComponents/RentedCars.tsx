import {useEffect, useState} from "react";
import API from "../../config/apiClient.ts";
import BookingCard from "./BookingCard";
import {useNavigate} from "react-router-dom";

const fetchCars = async (bookings) => {

    try {
        const result = await Promise.all(
            bookings?.map(async (booking) => {
                const response = await API.get(`car/${booking.carId}`);
                return response
            })
        )
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const RentedCars = (props) => {

    const [user, setUser] = useState(null)
    const [carList, setCarList] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const nav = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const fetchUser = async () => {
            const response = await API.get('/user');
            setUser(response);
            setIsLoading(false)
        }

        fetchUser();
    }, []);

    useEffect(() => {

        setIsLoading(true)

        const fetchData = async () => {
            const fetchedData = await fetchCars(user?.bookings);
            setCarList(fetchedData);

            setIsLoading(false)
        }

        if(user !== null) {
            fetchData();
        }

    }, [user]);


    if (user !== null && carList !== null) {
        console.log(carList)

        return (
            <div className="w-full flex flex-col bg-gray-300 justify-start items-center pt-12 px-6 pb-12 gap-y-4">
                {carList.map((carData, index) => {return BookingCard(carData, user, index, nav)})}
            </div>
        )
    }
}

export default RentedCars;