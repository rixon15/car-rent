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

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [popularCars, setPopularCars] = useState<iData | null>(null);

  useEffect(() => {
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
    console.log(popularCars);
  }, []);

  if (!isLoading && popularCars) {
    return (
      <div className="bg-gray-100 w-full">
        <header>
          <div className="bg-white">
            <div className="container px-2 sm:mx-auto">
              {user ? <NavbarAuth /> : <NavbarNoAuth />}
            </div>
          </div>
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
        <div className="container px-2 sm:mx-auto">
          <section id="popular cars">
            <div className="flex flex-row items-center justify-between">
            <p className="text-gray-500 px-5 my-10 font-semibold">Popular Cars</p>
            <Link to={'/cars'} className="font-semibold text-blue-500">View All</Link>
            </div>
            <div className="flex flex-row flex-wrap justify-center sm:justify-between gap-y-8">
              {popularCars?.map((car, index) => ItemCard(car, index))}
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
