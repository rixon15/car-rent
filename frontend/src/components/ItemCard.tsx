import { NavigateFunction } from "react-router-dom";

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

const ItemCard = (car: iCar, index: number, navigate: NavigateFunction) => {
    
  return (
    <div
      className="flex flex-col p-6 rounded-xl bg-white w-full sm:w-auto"
      key={index}
    >
      <p className="font-bold text-xl mb-1">{car.name}</p>
      <p className="font-sm text-gray-500 mb-20 font-bold">{car.type}</p>
      <img src={car.image} alt="ar image" className="w-full self-center mb-9" />
      <div className="flex flex-row items-center justify-center mb-6 gap-x-4">
        <div className="flex flex-row items-center justify-between">
          <img src="/gasStation.svg" alt="fuel capacity" className="size-6" />
          <p className="text-sm text-gray-500 ml-[6px]">{`${car.fuelCapacity}L`}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="/transmission.svg"
            alt="transmission type"
            className="size-6"
          />
          <p className="text-sm text-gray-500 ml-[6px]">{`${car.transmission}`}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img src="/profile2user.svg" alt="car seats" className="size-6" />
          <p className="text-sm text-gray-500 ml-[6px]">{`${car.capacity} People`}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <p className="text-xl">{`$${car.price / 100}.${
            car.price % 100
          }/ `}</p>
          <p className="text-sm text-gray-500 text-center ml-1">day</p>
        </div>
        <button
          className="w-32 h-11 bg-blue-600 text-white rounded-sm"
          onClick={() => navigate(`/car/${car._id}`)}
        >
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
