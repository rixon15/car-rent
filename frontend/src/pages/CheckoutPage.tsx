import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import {useAuthStore} from "../store/authStore.ts";
// import CheckoutForm from "../components/CheckoutForm"

const stripePromise = loadStripe(
  "pk_test_51Q9ogHGbTfD8I5KIBYkv062goLPzOCkNAAdJmxtN8qp8DOdXTWvEVPTbZnm0yjof4sfj3NatPNXp11f4QGRLeQXY00P2D12ysc"
);

const CheckoutPage = () => {
  // const [carInfo, setCarInfo] = useState<IcarInfo>();/
  const [loading, setLoading] = useState(true);
  // const [windowWidth, setWindowWidth] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchStripeSecret = async () => {
      setLoading(true);

      await axios
        .post(`http://localhost:4004/payment/${id}`)
        .then((response) => setClientSecret(response.data.clientSecret))
        .catch((error) => {
          console.error(error);
        });

      setLoading(false);

      console.log(clientSecret);
    };

    fetchStripeSecret();
  }, []);

  const options = {
    clientSecret,
  };

  if (!loading) {
    return (
      <div id="checkout">
        {clientSecret && (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    );
  }
};

export default CheckoutPage;
