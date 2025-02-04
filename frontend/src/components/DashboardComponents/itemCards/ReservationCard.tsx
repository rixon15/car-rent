import {NavigateFunction} from "react-router-dom";

const ReservationCard = (reservationData: object, index: number, navigate: NavigateFunction) => {

    return (
        <div className='flex flex-col p-6 rounded-xl bg-white w-full sm:w-auto' key={index}>
            <p>Name: {reservationData.name}</p>
            <p>Phone Number: {reservationData.phoneNumber}</p>
            <p>Pickup Date: {reservationData.pickupDate}</p>
            <p>Time: {reservationData.pickupTime}</p>
            <p>Dropoff Date: {reservationData.dropoffDate}</p>
            <p>Dropoff Time: {reservationData.dropoffTime}</p>
            <p>Verified: {reservationData.verified.toString()}</p>
            <p onClick={() => {navigate(`/car/${reservationData.carId}`)}}>Car ID: <span className="cursor-pointer text-blue-600">{reservationData.carId}</span></p>
        </div>
    )
}

export default ReservationCard