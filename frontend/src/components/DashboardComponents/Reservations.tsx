import {useEffect, useState} from "react";
import API from "../../config/apiClient.ts";
import ReservationCard from "./itemCards/ReservationCard.tsx";
import {useNavigate} from "react-router-dom";

const Reservations = () => {
    const [reservationList, setReservationList] = useState();
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);

        const fetchReservationsData = async () => {
            try {
                const response = await API.get('/booking');
                setReservationList(response);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                return error;
            }
        }

        fetchReservationsData();
        setIsLoading(false);
    })


    return (
        <div
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 row-auto justify-center sm:justify-between gap-8 p-8">
            {reservationList?.map((reservation: object, index: number) => (
                ReservationCard(reservation, index, navigate)
            ))}
        </div>
    )
}

export default Reservations