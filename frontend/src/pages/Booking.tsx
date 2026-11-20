import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

type Flight = {
  _id: string
  airline: string
  flightNumber: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  availableSeats: number
}

type LocationState = {
  flight?: Flight
  passengers?: number
}

function Booking() {
  const { flightId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as LocationState | null

  const flight = state?.flight
  const passengerCount = state?.passengers || 1

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [passportOrId, setPassportOrId] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError('')

    const token = localStorage.getItem('token')

    if (!token) {
      setError('Please login before making a reservation.')
      return
    }

    if (!flightId) {
      setError('Flight information is missing.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            flightId,
            passengerFirstName: firstName,
            passengerLastName: lastName,
            passengerEmail: email,
            passengerPhone: phone,
            passportOrId,
            passengers: passengerCount,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Unable to create reservation.')
        return
      }

      navigate('/booking-confirmation', {
        state: {
          reservation: data.reservation,
          flight,
        },
      })
    } catch {
      setError(
        'Unable to connect to the server. Please make sure the backend is running.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-md">
          <div className="text-5xl mb-4">✈️</div>

          <h1 className="text-2xl font-bold text-slate-900">
            Flight information unavailable
          </h1>

          <p className="text-slate-600 mt-2">
            Please search for a flight again.
          </p>

          <Link
            to="/search-flights"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Search Flights
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = flight.price * passengerCount

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/flight-results"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Passenger Information
              </h1>

              <p className="text-slate-600 mt-2 mb-8">
                Enter the passenger details for your reservation.
              </p>

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>

                    <input
                      type="text"
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(event.target.value)
                      }
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>

                    <input
                      type="text"
                      value={lastName}
                      onChange={(event) =>
                        setLastName(event.target.value)
                      }
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Passenger email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Passenger phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Passport / National ID
                  </label>

                  <input
                    type="text"
                    value={passportOrId}
                    onChange={(event) =>
                      setPassportOrId(event.target.value)
                    }
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Passport or ID number"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
                >
                  {loading
                    ? 'Processing Reservation...'
                    : 'Confirm Reservation'}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900">
                Flight Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Airline
                  </p>

                  <p className="font-semibold text-slate-900">
                    {flight.airline}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Flight
                  </p>

                  <p className="font-semibold text-slate-900">
                    {flight.flightNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Route
                  </p>

                  <p className="font-semibold text-slate-900">
                    {flight.from} → {flight.to}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Time
                  </p>

                  <p className="font-semibold text-slate-900">
                    {flight.departureTime} →{' '}
                    {flight.arrivalTime}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Passengers
                  </p>

                  <p className="font-semibold text-slate-900">
                    {passengerCount}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500">
                    Total Price
                  </p>

                  <p className="text-2xl font-bold text-blue-600">
                    ৳{totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}














export default Booking