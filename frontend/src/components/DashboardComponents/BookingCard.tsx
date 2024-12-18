import {useAuthStore} from "../../store/authStore.ts";
import {Link} from "react-router-dom";

const BookingCard = (carData, user,index) => {

    console.log(carData.bookings.filter((booking) => booking.userId === user._id)[0].createdAt)

    return (
        <div className="w-full flex flex-row bg-white rounded-xl" key={index}>
            <div className="flex items-center justify-center pr-4">
                <Link to={`/car/${carData._id}`}>
                    <img src={`${carData.images[0]}`} alt="Car image" className="bg-blue-500 size-32 rounded-xl"/>
                </Link>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col w-full justify-center gap-y-4">
                    <p className="font-bold text-black">{carData.name}</p>
                    <p className="text-gray-400">{carData.type}</p>
                </div>
                <div className="flex flex-col items-center justify-end w-full pr-6 gap-y-4">
                    <p className="text-gray-400">{new Date(carData.bookings.filter((booking) => booking.userId === user._id)[0].createdAt).toLocaleString('default', { month: 'long' })}</p>
                    <p className="font-bold text-black">${`${carData.price.toString().slice(0,carData.price.toString().length - 2)}.${carData.price.toString().slice(carData.price.toString().length - 2, carData.price.toString().length)}`}</p>
                </div>
            </div>
        </div>
    )

}

export default BookingCard;