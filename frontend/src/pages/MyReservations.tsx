import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

type Reservation = { _id: string; passengerFirstName: string; passengerLastName: string; passengers: number; totalPrice: number; status: string; flightId?: { airline: string; flightNumber: string; from: string; to: string; departureDate: string; departureTime: string; arrivalTime: string } | null }
function MyReservations() {
  const [items,setItems] = useState<Reservation[]>([]); const [loading,setLoading] = useState(true); const [error,setError] = useState('')
  useEffect(() => { const token=localStorage.getItem('token'); if(!token){setError('Please login to view your reservations.');setLoading(false);return}
    fetch('http://localhost:5000/api/reservations/my',{headers:{Authorization:`Bearer ${token}`}}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.message||'Unable to load reservations');setItems(d.reservations||[]) }).catch(e=>setError(e.message)).finally(()=>setLoading(false))
  },[])
  return <div className="min-h-screen bg-slate-100"><Navbar/><main className="max-w-6xl mx-auto px-6 py-10"><div className="flex flex-wrap justify-between items-center gap-4 mb-8"><div><p className="text-blue-600 font-semibold">YOUR TRAVEL</p><h1 className="text-3xl font-bold">My Reservations</h1><p className="text-slate-500 mt-1">View your bookings and reservation details.</p></div><Link to="/search-flights" className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold">Find Flights</Link></div>
    {loading&&<p className="bg-white rounded-xl p-8">Loading reservations...</p>}{error&&<p role="alert" className="bg-red-50 text-red-700 rounded-xl p-5">{error} <Link to="/login" className="underline">Login</Link></p>}
    {!loading&&!error&&items.length===0&&<div className="bg-white rounded-xl p-12 text-center"><div className="text-5xl">🎫</div><h2 className="text-xl font-bold mt-4">No reservations yet</h2><p className="text-slate-500 mt-2">Your confirmed bookings will appear here.</p></div>}
    <div className="space-y-4">{items.map(item=><article key={item._id} className="bg-white border rounded-xl p-6 shadow-sm"><div className="flex flex-wrap justify-between gap-4"><div><p className="font-bold text-lg">{item.flightId?.airline||'Flight'} · {item.flightId?.flightNumber||'Flight details unavailable'}</p><p className="text-slate-600 mt-1">{item.flightId?.from||'—'} → {item.flightId?.to||'—'}</p><p className="text-sm text-slate-500 mt-2">{item.flightId?.departureDate?new Date(item.flightId.departureDate).toLocaleDateString():'Date unavailable'} · {item.flightId?.departureTime||''}</p></div><div className="text-right"><span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${item.status==='confirmed'?'bg-green-100 text-green-700':'bg-slate-100 text-slate-600'}`}>{item.status}</span><p className="text-xl font-bold text-blue-600 mt-3">৳{item.totalPrice.toLocaleString()}</p><Link to={`/reservations/${item._id}`} className="text-blue-600 font-semibold text-sm">View details →</Link></div></div></article>)}</div>
  </main></div>
}
export default MyReservations
