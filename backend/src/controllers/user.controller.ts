import {NOT_FOUND, OK} from "../constants/http";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {

    console.log(req.body)

    const user = await UserModel.findById(req.userId).populate({
        path: 'bookings',
        model: 'Booking',
    }).exec();
    ;
    appAssert(user, NOT_FOUND, "User not found");

    return res.status(OK).json(user.omitPassword());
});
