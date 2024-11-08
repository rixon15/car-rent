import { useNavigate } from "react-router-dom";
import NavbarAuth from "../components/sharedComponents/NavbarAuth";
import NavbarNoAuth from "../components/sharedComponents/NavbarNoAuth";
import Footer from "../components/sharedComponents/Footer";
import { useEffect, useState } from "react";
import API from "../config/apiClient";
import ItemCard from "../components/ItemCard";
import axios from "axios";

interface iCar {
  _id: string;
  name: string;
  description: string;
  image: string;
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

const CarSearchPage = (props: any) => {
  const user = props.user;
  const [carList, setCarList] = useState<iData | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchCarList = async () => {
      setIsLoading(true);
      try {
        const data: iData = await API.get(`car/search`, {
          params: {
            page: page,
            carTypes: carTypes,
            capacity: capacity,
            searchTerm: "test",
          },
        });
        if (carList) {
          setCarList((prevState) => [...prevState, ...data]);
        } else {
          setCarList(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarList();
  }, [page]);

  if (!isLoading) {
    console.log(carList);
  }

  if (!isLoading) {
    return (
      <div className="bg-gray-100 w-full">
        <header>
          <div className="bg-white">
            <div className="container px-2 sm:mx-auto">
              {user ? <NavbarAuth /> : <NavbarNoAuth />}
            </div>
          </div>
        </header>
        <div className="flex flex-row">
          <div className="flex flex-col h-screen bg-white w-[22rem] border-t border-gray-100 p-8 gap-y-14">
            <div className="flex flex-col">
              <p className="font-semibold text-xs mb-7 text-gray-300">Type</p>
              <ul>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="sport" id="sport" />
                  <label htmlFor="sport">Sport</label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="suv" id="suv" />
                  <label htmlFor="suv" className="uppercase">
                    suv
                  </label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="mpv" id="mpv" />
                  <label htmlFor="mpv" className="uppercase">
                    mpv
                  </label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="sedan" id="sedan" />
                  <label htmlFor="sedan">Sedan</label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="coupe" id="coupe" />
                  <label htmlFor="coupe">Coupe</label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="hatchback" id="hatchback" />
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
                  <input type="checkbox" name="2person" id="2person" />
                  <label htmlFor="2person">2 Person</label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="4person" id="4person" />
                  <label htmlFor="4person">4 Person</label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="6person" id="6person" />
                  <label htmlFor="6person">6 Person</label>
                </li>
                <li className="flex flex-row gap-x-4 cursor-pointer">
                  <input type="checkbox" name="8person" id="8person" />
                  <label htmlFor="8person">8 Person</label>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="container sm:mx-auto px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 row-auto justify-center sm:justify-between gap-8">
                {carList?.map((car, index) => ItemCard(car, index, navigate))}
              </div>
              <div className="flex flex-row items-center justify-center w-full my-16">
                <button
                  className="w-36 h-11 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Show More
                </button>
              </div>
            </div> */}
        </div>
        <div className="bg-white">
          <footer className="container px-2 sm:mx-auto">
            <Footer />
          </footer>
        </div>
      </div>
    );
  }
};

export default CarSearchPage;
