import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import Home from './pages/Home'
import HomeIcy from './pages/HomeIcy'
import HomePlum from './pages/HomePlum'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import FlightSearch from './pages/FlightSearch'
import FlightResults from './pages/FlightResults'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'
import MyReservations from './pages/MyReservations'
import ReservationDetails from './pages/ReservationDetails'
import AdminDashboard from './pages/AdminDashboard'

function Protected({ children, admin = false }: { children: ReactNode; admin?: boolean }) {
  const token = localStorage.getItem('token')
  let user: { role?: string } | null = null
  try { user = JSON.parse(localStorage.getItem('user') || 'null') } catch { user = null }
  if (!token) return <Navigate to="/login" replace />
  if (admin && user?.role !== 'admin') return <Navigate to="/dashboard" replace />
  return <>{children}</>
}
function App(){return <BrowserRouter><Routes>
  <Route path="/" element={<Home/>}/><Route path="/design-icy" element={<HomeIcy/>}/><Route path="/design-plum" element={<HomePlum/>}/>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
  <Route path="/search-flights" element={<FlightSearch/>}/><Route path="/flight-results" element={<FlightResults/>}/>
  <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
  <Route path="/booking/:flightId" element={<Protected><Booking/></Protected>}/>
  <Route path="/booking-confirmation" element={<Protected><BookingConfirmation/></Protected>}/>
  <Route path="/reservations" element={<Protected><MyReservations/></Protected>}/>
  <Route path="/reservations/:id" element={<Protected><ReservationDetails/></Protected>}/>
  <Route path="/admin" element={<Protected admin><AdminDashboard/></Protected>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></BrowserRouter>}
export default App
