import "./index.css";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/authPages/RegisterPage";
import HomePage from "./pages/HomePage";
import VerifyEmail from "./pages/authPages/VerifyEmail";
import LoginPage from "./pages/authPages/LoginPage";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import ResetPassword from "./pages/authPages/ResetPassword";
import CarSearchPage from "./pages/CarSearchPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import {useEffect, useState} from "react";
import DashboardPage from "./pages/DashboardPage.tsx";
import {useAuthStore} from "./store/authStore.ts";
import AppContainer from "./components/AppContainer.tsx";
import BookingForm from "./pages/BookingPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx"
import PaymentSuccessPage from "./pages/PaymentSuccessPage.tsx";
import API from "./config/apiClient.ts";


function App() {

    const {authCheck, user} = useAuthStore();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const auth = async () => {
            await API.get('auth/refresh')
            await authCheck();
            setIsLoading(false)
        }

        if (user !== null) {
            auth()
        }

        setIsLoading(false)
    }, []);

    if (!isLoading) {
        return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cars" element={<CarSearchPage/>}/>
                <Route path="/car/:id" element={<CarDetailsPage/>}/>
                <Route path="/:id/dashboard" element={<AppContainer/>}>
                    <Route index element={<DashboardPage/>}/>
                </Route>
                <Route path="/car/:id/booking" element={<BookingForm/>}/>
                <Route path="/payment/:id" element={<CheckoutPage/>}/>
                <Route path={"/payment/:id/success/return"} element={<PaymentSuccessPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/email/verify/:code" element={<VerifyEmail/>}/>
                <Route path="/password/forgot" element={<ForgotPassword/>}/>
                <Route path="/password/reset" element={<ResetPassword/>}/>
            </Routes>
        );
    }
}

export default App;
