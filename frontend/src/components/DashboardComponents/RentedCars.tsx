import {useEffect, useState} from "react";
import API from "../../config/apiClient.ts";

// const fetchBookings = async (arrayOfBookings, userid) => {
//     try {
//         const result = await Promise.all(
//             arrayOfBookings.map(async (booking) => {
//                 const response = await API.get(`/booking/${userid}`);
//                 if(!response?.ok) {
//                     throw new Error("Booking not found");
//                 }
//                 return response;
//             })
//         );
//         return result;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

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

    // useEffect(() => {
    //
    //     setIsLoading(true)
    //
    //     const fetchData = async () => {
    //         const bookingsResult = await API.get(`/booking/${user._id}`)
    //         setBookings(bookingsResult);
    //         const carsResult = await fetchCars(bookingsResult);
    //         setCarList(carsResult)
    //         setIsLoading(false)
    //     }
    //
    //
    //     fetchData()
    //
    // }, []);
    //
    //
    // console.log(bookings);
    // console.log(carList);

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
            <div className="w-full flex flex-col bg-gray-300 justify-start items-center pt-12">

            </div>
        )
    }
}

export default RentedCars;