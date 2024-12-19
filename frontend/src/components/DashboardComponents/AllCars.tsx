import {useEffect, useState} from "react";
import CarCard from "./itemCards/CarCard.tsx";
import API from "../../config/apiClient.ts";

const AllCars = () => {

    const [carList, setCarList] = useState<object[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [shouldRerender, setShouldRerender] = useState(false)

    useEffect(() => {

        setIsLoading(true)

        const fetchCarList = async () => {
            try {
                const response = await API.get('/car/list');
                setCarList(response);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }

        }

        fetchCarList();

    }, [shouldRerender]);


    if (!isLoading && carList) {
        return (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 row-auto justify-center sm:justify-between gap-8 p-8">
                {carList.map((carData, index) => (CarCard(carData, index, setShouldRerender, shouldRerender)))}
            </div>
        )
    }

}

export default AllCars;