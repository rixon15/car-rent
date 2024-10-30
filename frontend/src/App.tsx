import "./index.css";
import { Route, Routes } from "react-router-dom";
import BookingForm from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/car/:id/booking" element={<BookingForm />} />
      <Route path="/payment/:id" element={<CheckoutPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
    </Routes>
  );
}

export default App;
