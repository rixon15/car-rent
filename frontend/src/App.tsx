import "./index.css";
import { Route, Routes } from "react-router-dom";
import BookingForm from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/car/:id/booking" element={<BookingForm />} />
      <Route path="/payment/:id" element={<CheckoutPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;
