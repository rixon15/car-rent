import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/sharedComponents/Footer";
import NavbarAuth from "../components/sharedComponents/NavbarAuth";
import NavbarNoAuth from "../components/sharedComponents/NavbarNoAuth";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import API from "../config/apiClient";
import ItemCard from "../components/ItemCard";

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

const HomePage = (props: any) => {
  const user = props.user;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [popularCars, setPopularCars] = useState<iData | null>(null);
  const [carList, setCarList] = useState<iData | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const fetchPopularCars = async () => {
      try {
        const popularCars: iData = await API.get("/car/popular");
        setPopularCars(popularCars);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularCars();
  }, []);

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const data: iData = await API.get(`/car/list?page=${page}&number=8`);
        if (carList) {
          setCarList((prevState) => [...prevState, ...data]);
        } else {
          setCarList(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCarList();
  }, [page]);

  if (!isLoading && carList) {
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
          {/* Hero section */}
          <div className="container px-2 sm:mx-auto">
            <section id="hero" className="mt-8">
              <div className="grid w-full justify-normal lg:justify-between gap-x-8">
                <img
                  src="heroImage1.svg"
                  className="col-start-1 row-start-1 self-center bg-blue-400 rounded-xl w-full lg:w-auto h-full"
                  alt="First card image in hero"
                />
                <div className="col-start-1 row-start-1">
                  <div className="flex flex-col items-start justify-start gap-y-5 p-6 max-w-72">
                    <p className="text-white font-semibold text-2xl">
                      The Best Platform to Rent a Car
                    </p>
                    <p className="text-white font-semibold">
                      Ease of doing a car rental safely and reliably. Of course
                      at a low price
                    </p>
                    <button
                      className="w-32 h-12 bg-blue-600 rounded-md"
                      onClick={() => navigate("/cars")}
                    >
                      Rent a Car
                    </button>
                  </div>
                </div>
                <img
                  src="heroImage2.svg"
                  className="hidden lg:block col-start-2 row-start-1 self-center bg-blue-600 rounded-xl"
                  alt="Second card image in hero"
                />
                <div className="col-start-2 row-start-1 hidden lg:block">
                  <div className="flex flex-col items-start justify-start gap-y-5 p-6 max-w-72">
                    <p className="text-white font-semibold text-2xl">
                      The Best Platform to Rent a Car
                    </p>
                    <p className="text-white font-semibold">
                      Ease of doing a car rental safely and reliably. Of course
                      at a low price
                    </p>
                    <button
                      className="w-32 h-12 bg-blue-400 rounded-md"
                      onClick={() => navigate("/cars")}
                    >
                      Rent a Car
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </header>
        {/* Popular cars section */}
        <div className="container px-2 sm:mx-auto">
          <section id="popularCars">
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-500 px-5 my-10 font-semibold">
                Popular Cars
              </p>
              <Link to={"/cars"} className="font-semibold text-blue-500">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 row-auto justify-center sm:justify-between gap-8">
              {popularCars?.map((car, index) => ItemCard(car, index, navigate))}
            </div>
          </section>
        </div>
        {/* Recommended cars section */}
        <div className="container px-2 sm:mx-auto">
          <section id="recommendedCars">
            <div className="flex flex-row items-center justify-start">
              <p className="text-gray-500 px-5 my-10 font-semibold">
                Recommended Cars
              </p>
            </div>
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
          </section>
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

export default HomePage;
