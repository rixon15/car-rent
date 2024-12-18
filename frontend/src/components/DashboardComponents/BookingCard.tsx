const BookingCard = (carData, user,index, nav) => {


    return (
        <div className="w-full flex flex-row bg-white rounded-xl cursor-pointer" key={index} onClick={() => {nav(`/car/${carData._id}`)}}>
            <div className="flex items-center justify-center pr-4">
                    <img src={`${carData.images[0]}`} alt="Car image" className="bg-blue-500 size-32 rounded-xl"/>
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