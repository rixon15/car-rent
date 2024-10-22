import './index.css'
import { Route, Routes } from 'react-router-dom'
import BookingForm from './components/BookingForm'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <Routes>
      <Route path='/car/:id/booking' element={<BookingForm/>}/>
      <Route path='/payment/:id' element={<CheckoutPage/>}/>
    </Routes>
  )
}

export default App
