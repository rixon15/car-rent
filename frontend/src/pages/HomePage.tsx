import { useNavigate } from "react-router-dom";
import Footer from "../components/sharedComponents/Footer";
import NavbarAuth from "../components/sharedComponents/NavbarAuth";
import NavbarNoAuth from "../components/sharedComponents/NavbarNoAuth";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full flex flex-row">
      <div className="container mx-2 sm:mx-auto">
        <header>
          {user ? <NavbarAuth /> : <NavbarNoAuth />}
          {/* <section id="hero">
            <div className="flex flex-row items-center justify-between gap-x-8 ">
              <div className="w-1/2 h-80 flex bg-[url('BG.svg')] p-6 bg-cover bg-no-repeat bg-center bg-blue-400">
              <div className="flex flex-col items-start justify-start gap-y-5">
                <p className="text-white font-semibold text-2xl">The Best Platform to Rent a Car</p>
                <p className="text-white font-semibold">Ease of doing a car rental safely and reliably. Of course at a low price</p>
                <button className="w-32 h-12 bg-blue-600">Rent a Car</button>
              </div>
                <div className=" z-10 flex items-end justify-center w-full">
                  <img
                    src="/heroImage1.svg"
                    alt="hero car image"
                    className="max-w-96"
                  />
                </div>
              </div>
            </div>
          </section> */}
          <section id="hero">
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
                    Ease of doing a car rental safely and reliably. Of course at
                    a low price
                  </p>
                  <button className="w-32 h-12 bg-blue-600 rounded-md" onClick={() => navigate('/cars')}>Rent a Car</button>
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
                    Ease of doing a car rental safely and reliably. Of course at
                    a low price
                  </p>
                  <button className="w-32 h-12 bg-blue-400 rounded-md" onClick={() => navigate('/cars')}>Rent a Car</button>
                </div>
              </div>
            </div>
          </section>
        </header>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
