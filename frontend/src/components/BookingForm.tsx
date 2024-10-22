import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { SECURITY,  } from "../constants/svgPath";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

interface IclientInfo {
  name: string;
  phoneNumber: number;
  address: string;
  pickupDate: Date;
  pickupTime: string;
  dropoffDate: Date;
  dropoffTime: string;
  cardNumber: number;
  expirationDate: Date;
  cardHolder: string;
  CVC: number;
  marketing: boolean;
  termsAndCondition: boolean;
  paymentMethod: string;
}
interface IcarInfo {
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const BookingForm = () => {
  // const [errorMessage, setErrorMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);
  const [carInfo, setCarInfo] = useState<IcarInfo>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchCarInfo = async () => {
      await axios
        .get(`http://localhost:4004/car/${id}`)
        .then((response) => setCarInfo(response.data))
        .catch((err) => {
          console.error(err);
        });

      setLoading(false);
    };

    fetchCarInfo();
  }, [id]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  const [clientInfo, setClientInfo] = useState<IclientInfo>({
    name: "",
    phoneNumber: 0,
    address: "",
    pickupDate: new Date(),
    pickupTime: "10:00",
    dropoffDate: new Date(),
    dropoffTime: "10:00",
    cardNumber: 0,
    expirationDate: new Date(),
    cardHolder: "",
    CVC: 0,
    marketing: false,
    termsAndCondition: false,
    paymentMethod: "creditCard",
  });

  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit: React.FormEventHandler<HTMLButtonElement> = async (
  //   event: React.FormEvent<HTMLButtonElement>
  // ) => {
  //   // We don't want to let default form submission happen here,
  //   // which would refresh the page.
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js hasn't yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   const { error } = await stripe.confirmPayment({
  //     //`Elements` instance that was used to create the Payment Element
  //     elements,
  //     confirmParams: {
  //       // return_url: `http://localhost:4004/car/${id}`,
  //       return_url: `https://example.com/order/123/complete`,
  //     },
  //   });

  //   if (error) {
  //     // This point will only be reached if there is an immediate error when
  //     // confirming the payment. Show error to your customer (for example, payment
  //     // details incomplete)
  //     setErrorMessage(error.message as string);
  //     console.error(errorMessage);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //   }
  // };

  if (!loading) {
    return (
      <div className="container mx-auto">
        {/* Billing info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-3 gap-4 ">
          <div className="bg-[#FFFFFF] rounded-lg p-8 sm:grid-row-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <h1 className="font-bold text-xl">Billing Info</h1>
                <p className="text-sm">Please enter your billing info</p>
              </div>
              <div>
                <p className="text-sm">Step 1 of 4</p>
              </div>
            </div>
            <form className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-y-5 sm:gap-y-0">
              <div className="flex flex-col sm:mr-4 gap-y-4">
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="bg-[#F6F7F9] rounded-lg w-full h-14 placeholder:pl-8"
                  onChange={(e) =>
                    setClientInfo((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col sm:ml-4 gap-y-4">
                <label
                  htmlFor="phoneNumber"
                  className="font-bold whitespace-nowrap"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  maxLength={10}
                  className="bg-[#F6F7F9] rounded-lg w-full h-14 pl-8"
                  onChange={(e) =>
                    setClientInfo((prevState) => ({
                      ...prevState,
                      phoneNumber: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex flex-col sm:mt-6 gap-y-4">
                <label htmlFor="address" className="font-bold">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  className="bg-[#F6F7F9] rounded-lg h-14 pl-8 w-full mr-4 border-0"
                  onChange={(e) =>
                    setClientInfo((prevState) => ({
                      ...prevState,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
            </form>
          </div>
          {/* Rental Info */}
          <div className="col-start-1 row-start-3 sm:row-start-2 bg-[#FFFFFF] rounded-lg p-8">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <h1 className="font-bold text-xl">Rental Info</h1>
                <p className="text-sm">Please select your rental date</p>
              </div>
              <div>
                <p className="text-sm">Step 2 of 4</p>
              </div>
            </div>
            {/* Pickup */}
            <p className="font-bold mt-8">Pick Up</p>
            <form className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-y-5 sm:gap-y-0">
              <div className="flex flex-col sm:mr-4 gap-y-4">
                <label htmlFor="pickupDate" className="font-bold">
                  Date
                </label>
                <DatePicker
                  selected={clientInfo.pickupDate}
                  onChange={(e) =>
                    setClientInfo((prevState) => ({
                      ...prevState,
                      pickupDate: e as Date,
                    }))
                  }
                  className="bg-[#F6F7F9] rounded-lg h-14 pl-8 w-full"
                  name="pickupDate"
                  id="pickupDate"
                />
              </div>
              <div className="flex flex-col sm:ml-4 gap-y-4">
                <label htmlFor="pickupTime" className="font-bold">
                  Time
                </label>
                <TimePicker
                  value={clientInfo?.pickupTime}
                  onChange={(e) =>
                    setClientInfo((prevState) => ({
                      ...prevState,
                      pickupTime: e as string,
                    }))
                  }
                  disableClock={true}
                  locale="sv-sv"
                  name="pickupTime"
                  id="pickupTime"
                  className="bg-[#F6F7F9] rounded-lg h-14"
                />
              </div>
            </form>
            {/* Dropoff */}
            <p className="font-bold mt-8">Drop off</p>
            <form className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-y-5 sm:gap-y-0">
              <div className="flex flex-col sm:mr-4 gap-y-4">
                <label htmlFor="dropoffDate" className="font-bold">
                  Date
                </label>
                <DatePicker
                  selected={clientInfo.dropoffDate}
                  onChange={(e) =>
                    setClientInfo((prevState) => ({
                      ...prevState,
                      dropoffDate: e as Date,
                    }))
                  }
                  className="bg-[#F6F7F9] rounded-lg h-14 pl-8 w-full"
                  name="dropoffDate"
                  id="dropoffDate"
                />
              </div>
              <div className="flex flex-col sm:ml-4 gap-y-4">
                <label htmlFor="dropoffTime" className="font-bold">
                  Time
                </label>
                <TimePicker
                  value={clientInfo.dropoffTime}
                  onChange={(e) =>
                    setClientInfo((prevState) => ({
                      ...prevState,
                      dropoffTime: e as string,
                    }))
                  }
                  disableClock={true}
                  locale="sv-sv"
                  name="dropoffTime"
                  id="dropoffTime"
                  className="bg-[#F6F7F9] rounded-lg h-14"
                />
              </div>
            </form>
          </div>
          {/* Payment Method */}

          {/* <div className="col-start-1 row-start-4 sm:row-start-3">
            <div className="flex flex-col h-full">
              <div className="bg-[#FFFFFF] rounded-lg p-8 h-full">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-xl">Payment Method</h1>
                    <p className="text-sm">Please enter your payment details</p>
                  </div>
                  <div>
                    <p className="text-sm">Step 3 of 4</p>
                  </div>
                </div>
                <div className="bg-[#F6F7F9] p-6 rounded-lg mt-6">
                  <div className="flex flex-row mb-8 justify-between">
                    <div className="flex flex-row gap-x-2">
                      <input
                        type="radio"
                        name="creditCard"
                        id="creditCard"
                        defaultChecked
                      />
                      <label htmlFor="creditCard">Credit Card</label>
                    </div>
                    <img src={VISA} alt="Visa logo" />
                  </div>
                  <form className="grid gric-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-0">
                    <div className="flex flex-col sm:mr-4 gap-y-4">
                      <label
                        htmlFor="cardNumber"
                        className="font-bold whitespace-nowrap overflow-x-clip"
                      >
                        Card Number
                      </label>
                      <input
                        type="string"
                        name="cardNumber"
                        id="cardNumber"
                        maxLength={16}
                        placeholder="Card number"
                        className="bg-[#FFFFFF] rounded-lg w-full h-14 pl-8 "
                        onChange={(e) =>
                          setClientInfo((prevState) => ({
                            ...prevState,
                            cardNumber: parseInt(e?.target.value),
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col sm:ml-4 gap-y-4">
                      <label
                        htmlFor="expirationDate"
                        className="font-bold whitespace-nowrap overflow-x-clip"
                      >
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        value={expirationDate}
                        name="expirationDate"
                        id="expirationDate"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="bg-[#FFFFFF] rounded-lg w-full h-14 pl-8 "
                        onChange={(e) => {
                          setexpirationDate(
                            formatCardExpirationDate(e.target.value)
                          );
                          setClientInfo((prevState) => ({
                            ...prevState,
                            expirationDate: new Date(e.target.value),
                          }));
                        }}
                      />
                    </div>
                    <div className="flex flex-col sm:mt-6 gap-y-4 sm:mr-4">
                      <label
                        htmlFor="cardHolder"
                        className="font-bold whitespace-nowrap overflow-x-clip"
                      >
                        Card Holder
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        id="cardHolder"
                        placeholder="Card Holder"
                        className="bg-[#FFFFFF] rounded-lg h-14 pl-8 border-0 w-full"
                        onChange={(e) =>
                          setClientInfo((prevState) => ({
                            ...prevState,
                            cardHolder: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col sm:mt-6 gap-y-4 sm:ml-4">
                      <label htmlFor="CCV" className="font-bold">
                        CCV
                      </label>
                      <input
                        type="text"
                        name="CCV"
                        id="CCV"
                        placeholder="CCV"
                        className="bg-[#FFFFFF] rounded-lg h-14 pl-8 mr-4 border-0 w-full"
                        onChange={(e) =>
                          setClientInfo((prevState) => ({
                            ...prevState,
                            CVC: parseInt(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}

          {/* Confirmation */}
          <div className="col-start-1 row-start-4 sm:row-start-3 h-full">
            <div className="bg-[#FFFFFF] rounded-lg p-8 h-full">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl">Confirmation</h1>
                  <p className="text-sm max-w-[90%]">
                    We are getting to the end. Just a few clicks and your rental
                    is ready!
                  </p>
                </div>
                <div>
                  <p className="text-sm">Step 4 of 4</p>
                </div>
              </div>
              <form className="grid grid-cols-1 mt-6 gap-y-6">
                <div className="flex flex-row gap-x-[20px] bg-[#F6F7F9] p-4 rounded-lg">
                  <input
                    type="checkbox"
                    name="marketing"
                    id="marketing"
                    className="size-6"
                    onChange={() =>
                      setClientInfo((prevState) => ({
                        ...prevState,
                        marketing: !clientInfo.marketing,
                      }))
                    }
                  />
                  <label htmlFor="marketing" className="font-bold float-start ">
                    I agree with receiving Marketing and newsletter emails
                  </label>
                </div>
                <div className="flex flex-row gap-x-[20px] bg-[#F6F7F9] p-4 rounded-lg">
                  <input
                    type="checkbox"
                    name="termsAndConditions"
                    id="termsAndConditions"
                    className="size-6"
                    onChange={() => {
                      setClientInfo((prevState) => ({
                        ...prevState,
                        termsAndCondition: !clientInfo.termsAndCondition,
                      }));
                      console.log(carInfo);
                    }}
                  />
                  <label
                    htmlFor="termsAndConditions"
                    className="font-bold float-start "
                  >
                    I agree with the terms and conditions and privacy policy
                  </label>
                </div>
                <button
                  className="w-[140px] h-14 rounded-lg bg-[#3563E9] text-[#FFFFFF]"
                  onClick={() => {
                    navigate(`../payment/${id}`);
                  }}
                >
                  Rent Now
                </button>
              </form>
              <div className="flex flex-col mt-8 gap-y-4">
                <img src={SECURITY} alt="security logo" className="size-8" />
                <div className="flex flex-col gap-y-2">
                  <p className="font-bold">All your data is safe</p>
                  <p className="text-sm text-gray-400">
                    We are using the most advanced security to provide you the
                    best experience ever.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Rental Summary */}
          <div className="sm:row-span-4 sm:col-start-2  row-start-1 w-full sm:max-w-[500px] ">
            <div className="bg-[#FFFFFF] p-6 rounded-xl  h-full sm:h-1/4 min-h-[550px]">
              <div className="flex flex-col gap-y-8 h-full ">
                <h1 className="text-xl font-bold mb-1">Rental Summary</h1>
                <p className="text-sm text-gray-300">
                  Prices may change depending on the length of the rental and
                  the price of your rental car.
                </p>
                <div className="flex flex-row gap-x-4 items-center">
                  <img
                    src={carInfo?.image}
                    alt="car Image"
                    className="max-w-32 max-h-28"
                  />
                  <div className="flex flex-col">
                    <p
                      className={`${
                        windowWidth <= 640 ? "text-xl" : ""
                      } md:text-xl lg:text-4xl font-bold`}
                    >
                      {carInfo?.name}
                    </p>
                  </div>
                </div>
                <span className="border-y-[1px]"></span>
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-row justify-between">
                    <p>Subtotal</p>
                    <p className="font-bold">{`$${carInfo?.price}`}</p>
                  </div>
                  {/* <div className="flex flex-row justify-between">
                    <p>Tax</p>
                    <p className="font-bold">
                      ${(carInfo?.price as number) * tax}
                    </p>
                  </div> */}
                </div>
                <div className="flex flex-row items-center rounded-lg gap-x-8 gap-y-4 relative h-14">
                  <input
                    type="text"
                    className="bg-[#F6F7F9] w-full rounded-lg placeholder:pl-8 h-14"
                    placeholder="Apply promo code"
                  />
                  <button className="absolute font-semibold text-black float-end right-0 text-center h-14 mr-8">
                    Apply Now
                  </button>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-y-1">
                    <p className="font-bold">Total Rent Price</p>
                    <p className="text-sm text-gray-400">
                      Overall price and includes rental discount
                    </p>
                  </div>
                  <p className="text-3xl font-bold">
                    $
                    {(carInfo?.price as number)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BookingForm;
