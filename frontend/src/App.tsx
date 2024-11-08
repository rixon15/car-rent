import "./index.css";
import { Route, Routes } from "react-router-dom";
import BookingForm from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import AppContainer from "./components/AppContainer";
import RegisterPage from "./pages/authPages/RegisterPage";
import HomePage from "./pages/HomePage";
import VerifyEmail from "./pages/authPages/VerifyEmail";
import LoginPage from "./pages/authPages/LoginPage";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import ResetPassword from "./pages/authPages/ResetPassword";
import CarSearchPage from "./pages/CarSearchPage";
import useAuth from "./hooks/useAuth";

export const Home = () => {
  return <div>Home Test</div>;
};

function App() {
  // const { user } = useAuth();
  const user = true;

  return (
    <Routes>
      {/* <Route path="/" element={<AppContainer />}>
        <Route index element={<Home/>}/>
      </Route> */}
      <Route path="/" element={<HomePage user={user} />} />
      <Route path="/cars" element={<CarSearchPage user={user} />} />
      <Route path="/car/:id/booking" element={<BookingForm />} />
      <Route path="/payment/:id" element={<CheckoutPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
