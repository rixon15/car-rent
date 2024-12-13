import {STRIPE_SECREET} from "../constants/env";
import {NOT_FOUND, OK} from "../constants/http";
import CarModel from "../models/car.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import fetch from "nodemailer/lib/fetch";
import {json} from "node:stream/consumers";
import UserModel from "../models/user.model";

const stripe = require("stripe")(STRIPE_SECREET);

// Note: Could/shoudl implement a function to create a Stripe user based on the logged in user -> Todo?
// Note: Could/should implement a function to create a discount coupon that can be applied to the products -> Todo? (later on when I do the backoffice)

// async function getData() {
//   const url = "https://example.org/products.json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//
//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

export const paymentIntentHandler = catchErrors(async (req, res) => {
    const car = await CarModel.findById(req?.params.id);
    appAssert(car, NOT_FOUND, "Car not found in the database");

    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        billing_address_collection: "auto",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: car.price,
                    product_data: {
                        name: car.name,
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        return_url: `${req.headers.origin}/payment/${req.params.id}/success/return?session_id={CHECKOUT_SESSION_ID}`,
    });


    return res.status(OK).json({clientSecret: session.client_secret});
});
