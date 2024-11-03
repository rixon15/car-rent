import "./index.css";
import { Route, Routes } from "react-router-dom";
import BookingForm from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AppContainer from "./components/AppContainer";
import HomePage from "./pages/HomePage";

export const Home = () => {
  return <div>Home Test</div>
}

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<AppContainer />}>
        <Route index element={<Home/>}/>
      </Route> */}
      <Route path="/" element={<HomePage/>}/>
      <Route path="/car/:id/booking" element={<BookingForm />} />
      <Route path="/payment/:id" element={<CheckoutPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/password/reset" element={<ResetPassword/>}/>
    </Routes>
  );
}

export default App;
