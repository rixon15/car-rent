import './index.css'
import { Route, Routes } from 'react-router-dom'
import CarBookingPage from './pages/CarBookingPage'

function App() {
  return (
    <Routes>
      <Route path='/car/:id/booking' element={<CarBookingPage/>}/>
    </Routes>
  )
}

export default App
