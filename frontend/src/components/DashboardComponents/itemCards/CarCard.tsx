import API from "../../../config/apiClient.ts";

const handleDelete = async (e, id: string, setShouldRerender, shouldRerender) => {
    e.preventDefault();

    try {
        const response = await API.delete(`/car/${id}`)
        setShouldRerender(!shouldRerender);
        return response
    } catch (error) {
        console.error(error)
    }

}

const CarCard = (carData: object, index: number, setShouldRerender, shouldRerender) => {

    return (<div
        className="flex flex-col p-6 rounded-xl bg-white w-full sm:w-auto"
        key={index}
    >
        <p className="font-bold text-xl mb-1">{carData.name}</p>
        <p className="font-sm text-gray-500 mb-20 font-bold">{carData.type}</p>
        <img src={carData.images[0]} alt="ar image" className="w-full self-center mb-9"/>
        <div className="flex flex-row items-center justify-center mb-6 gap-x-4">
            <div className="flex flex-row items-center justify-between">
                <img src="/gasStation.svg" alt="fuel capacity" className="size-6"/>
                <p className="text-sm text-gray-500 ml-[6px]">{`${carData.fuelCapacity}L`}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
                <img
                    src="/transmission.svg"
                    alt="transmission type"
                    className="size-6"
                />
                <p className="text-sm text-gray-500 ml-[6px]">{`${carData.transmission}`}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
                <img src="/profile2user.svg" alt="car seats" className="size-6"/>
                <p className="text-sm text-gray-500 ml-[6px]">{`${carData.capacity} People`}</p>
            </div>
        </div>
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
                <p className="text-xl">{`$${carData.price / 100}.${carData.price % 100}/ `}</p>
                <p className="text-sm text-gray-500 text-center ml-1">day</p>
            </div>
            <button
                className="w-32 h-11 bg-blue-600 text-white rounded-sm"
                onClick={(e) => handleDelete(e, carData._id, setShouldRerender, shouldRerender)}
            >
                Delete
            </button>
        </div>
    </div>)

}

export default CarCard;