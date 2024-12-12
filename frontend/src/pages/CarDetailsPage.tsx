import {useEffect, useState} from "react";
import API from "../config/apiClient.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import NavbarAuth from "../components/sharedComponents/NavbarAuth.tsx";
import NavbarNoAuth from "../components/sharedComponents/NavbarNoAuth.tsx";
import Footer from "../components/sharedComponents/Footer.tsx";
import ItemCard from "../components/ItemCard.tsx";
import {useAuthStore} from "../store/authStore.ts";

interface iCar {
    _id: string;
    name: string;
    description: string;
    images: string[];
    type: string;
    capacity: number;
    transmission: string;
    fuelCapacity: number;
    price: number;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

type iData = iCar[];

const checkCheckbox = (
    inputElement: HTMLInputElement,
    object: { [key: string]: boolean },
    setState: Function
) => {
    const newState = Object.assign({}, object);
    newState[inputElement.id as string] = !newState[inputElement.id];
    setState(newState);

};

const CarDetailsPage = () => {

    const [carDetails, setCarDetails] = useState<iCar | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const id = useParams().id;
    const carPriceString = carDetails?.price.toString();
    const [carList, setCarList] = useState<iData | null>(null);
    const [carTypes, setCarTypes] = useState({
        sport: true,
        suv: false,
        mpv: false,
        sedan: false,
        coupe: false,
        hatchback: false,
    });

    const [capacity, setCapacity] = useState({
        person2: true,
        person4: false,
        person6: false,
        parson8: false,
    });

    const navigate = useNavigate();

    const {user} = useAuthStore();


    useEffect(() => {
        const fetchCarDetails = async () => {
            setIsLoading(true);
            try {
                const data: iCar = await API.get(`/car/${id}`);
                setCarDetails(data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        const fetchCarList = async () => {
            try {
                const data: iData = await API.get(`car/search`, {
                    params: {
                        page: 1,
                        carTypes: carTypes,
                        capacity: capacity,
                        searchTerm: '',
                    },
                });
                setCarList(data);
            } catch (error) {
                console.log(error);
            }
        };


        fetchCarList();
        fetchCarDetails();
    }, [id]);


    if (!isLoading) {
        return (
            <div className="bg-gray-100 w-full">
                <header>
                    <div className="bg-white">
                        <div className="container px-2 sm:mx-auto">
                            {user ? <NavbarAuth/> : <NavbarNoAuth/>}
                        </div>
                    </div>
                </header>
                {/* options bar */}
                <div className="flex flex-row">
                    <div className="sm:flex flex-col bg-white w-[22rem] border-t border-gray-100 p-8 gap-y-14 hidden">
                        <div className="flex flex-col">
                            <p className="font-semibold text-xs mb-7 text-gray-300">Type</p>
                            <ul>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="sport"
                                        id="sport"
                                        defaultChecked
                                        onChange={(e) =>
                                            checkCheckbox(e.target, carTypes, setCarTypes)
                                        }
                                    />
                                    <label htmlFor="sport">Sport</label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="suv"
                                        id="suv"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, carTypes, setCarTypes)
                                        }
                                    />
                                    <label htmlFor="suv" className="uppercase">
                                        suv
                                    </label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="mpv"
                                        id="mpv"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, carTypes, setCarTypes)
                                        }
                                    />
                                    <label htmlFor="mpv" className="uppercase">
                                        mpv
                                    </label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="sedan"
                                        id="sedan"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, carTypes, setCarTypes)
                                        }
                                    />
                                    <label htmlFor="sedan">Sedan</label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="coupe"
                                        id="coupe"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, carTypes, setCarTypes)
                                        }
                                    />
                                    <label htmlFor="coupe">Coupe</label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="hatchback"
                                        id="hatchback"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, carTypes, setCarTypes)
                                        }
                                    />
                                    <label htmlFor="hatchback">Hatchback</label>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-xs mb-7 text-gray-300">
                                Capacity
                            </p>
                            <ul>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="person2"
                                        id="person2"
                                        defaultChecked
                                        onChange={(e) =>
                                            checkCheckbox(e.target, capacity, setCapacity)
                                        }
                                    />
                                    <label htmlFor="person2">2 Person</label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="person4"
                                        id="person4"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, capacity, setCapacity)
                                        }
                                    />
                                    <label htmlFor="person4">4 Person</label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="person6"
                                        id="person6"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, capacity, setCapacity)
                                        }
                                    />
                                    <label htmlFor="person6">6 Person</label>
                                </li>
                                <li className="flex flex-row gap-x-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="person8"
                                        id="person8"
                                        onChange={(e) =>
                                            checkCheckbox(e.target, capacity, setCapacity)
                                        }
                                    />
                                    <label htmlFor="person8">8 Person</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* car details */}
                    <div className="container sm:mx-auto px-4 my-8">
                        <div className={'flex flex-col lg:flex-row px-8 gap-x-4 gap-y-8 justify-between'}>
                            <div className={'items-center justify-center flex flex-col rounded-md'}>
                                <img src={carDetails?.images[0]} alt="car image"
                                     className={'bg-blue-400 center rounded-xl  w-full h-[510px]'}/>
                                <div className={'flex flex-row items-center justify-evenly pt-6 w-full'}>
                                    {carDetails?.images.map((image, index) => (
                                        <img src={image} alt="car image" key={index}
                                             className={'size-[124px] bg-blue-500 rounded-xl hidden md:block'}/>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={'flex flex-col gap-y-14 p-8 lg:p-6 rounded-xl bg-white w-full min-h-full'}>
                                <p className={'font-bold text-3xl'}>{carDetails?.name}</p>
                                <p className={'text-gray-400'}>{carDetails?.description}</p>
                                <div
                                    className={'flex flex-col md:flex-row justify-center md:justify-between gap-y-4 md:gap-y-0'}>
                                    <div className={'flex flex-row gap-x-2 w-full justify-center max-w-[200px]'}>
                                        <p className={'text-gray-400'}>Car Type</p>
                                        <p className={'text-gray-500 font-bold'}>{carDetails?.type}</p>
                                    </div>
                                    <div className={'flex flex-row gap-x-2 w-full justify-center max-w-[200px]'}>
                                        <p className={'text-gray-400'}>Capacity</p>
                                        <p className={'text-gray-500 font-bold'}>{`${carDetails?.capacity} Person`}</p>
                                    </div>
                                </div>
                                <div
                                    className={'flex flex-col md:flex-row justify-center md:justify-between gap-y-4 md:gap-y-0'}>
                                    <div className={'flex flex-row gap-x-2 w-full max-w-[200px] justify-center'}>
                                        <p className={'text-gray-400'}>Transmission</p>
                                        <p className={'text-gray-500 font-bold'}>{carDetails?.transmission}</p>
                                    </div>
                                    <div className={'flex flex-row justify-center md:justify-between max-w-[200px]'}>
                                        <p className={'text-gray-400'}>Gasoline</p>
                                        <p className={'text-gray-500 font-bold'}>{`${carDetails?.fuelCapacity}L`}</p>
                                    </div>
                                </div>
                                <div
                                    className={'flex flex-col md:flex-row justify-center md:justify-between gap-y-4 md:gap-y-0'}>
                                    <p className={'font-bold text-3xl text-center'}>{`${carPriceString?.slice(0, carPriceString?.length - 2)}.${carPriceString?.slice(carPriceString?.length - 2, carPriceString?.length)} / days`}</p>
                                    <button
                                        className={'w-[140px] h-[56px] bg-blue-500 text-white font-semibold rounded-md self-center'}
                                        onClick={() => navigate(`/car/${id}/booking`)}>Rent Now
                                    </button>
                                </div>
                            </div>

                        </div>
                        {/* recommended cars*/}
                        <div className={'flex flex-row w-full items-center justify-between px-8 mt-8'}>
                            <p className={'text-gray-400'}>Recommended cars</p>
                            <Link to={'/cars'}>View All</Link>
                        </div>
                        <div
                            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 row-auto justify-center sm:justify-between gap-8 p-8">
                            {carList?.map((car, index) => ItemCard(car, index, navigate))}
                        </div>
                    </div>
                </div>

                <div className="bg-white">
                    <footer className="container px-2 sm:mx-auto">
                        <Footer/>
                    </footer>
                </div>
            </div>
        )
    }


}

export default CarDetailsPage