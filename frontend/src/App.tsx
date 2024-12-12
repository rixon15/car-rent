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
import {useEffect} from "react";
import DashboardPage from "./pages/DashboardPage.tsx";
import {useAuthStore} from "./store/authStore.ts";

export const Home = () => {
    return <div>Home Test</div>;
};


function App() {

    const {authCheck} = useAuthStore();

    useEffect(() => {
        authCheck();
    }, []);

    return (
        <Routes>
            {/* <Route path="/" element={<AppContainer />}>
        <Route index element={<Home/>}/>
      </Route> */}
            <Route path="/" element={<HomePage/>}/>
            <Route path="/cars" element={<CarSearchPage/>}/>
            <Route path="/car/:id" element={<CarDetailsPage/>}/>
            <Route path="/:id/dashboard" element={<DashboardPage/>}/>
            {/* <Route path="/car/:id/booking" element={<BookingForm />} />
      <Route path="/payment/:id" element={<CheckoutPage />} /> */}
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/email/verify/:code" element={<VerifyEmail/>}/>
            <Route path="/password/forgot" element={<ForgotPassword/>}/>
            <Route path="/password/reset" element={<ResetPassword/>}/>
        </Routes>
    );
}

export default App;
