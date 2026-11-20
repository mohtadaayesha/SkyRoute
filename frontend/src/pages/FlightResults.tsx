import { useEffect, useState } from 'react'
import {
  Link,
  useSearchParams,
} from 'react-router-dom'

type Flight = {
  _id: string
  airline: string
  flightNumber: string
  from: string
  to: string
  departureDate: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  totalSeats: number
  availableSeats: number
  status: 'scheduled' | 'cancelled'
}

function FlightResults() {
  const [searchParams] = useSearchParams()

  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const date = searchParams.get('date') || ''
  const passengers = searchParams.get('passengers') || '1'

  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadFlights() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `http://localhost:5000/api/flights/search?from=${encodeURIComponent(
            from,
          )}&to=${encodeURIComponent(
            to,
          )}&date=${encodeURIComponent(date)}&passengers=${encodeURIComponent(passengers)}`,
        )

        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Unable to load flights.')
          return
        }

        setFlights(data.flights || [])
      } catch {
        setError(
          'Unable to connect to the server. Please make sure the backend is running.',
        )
      } finally {
        setLoading(false)
      }
    }

    if (from && to && date) {
      loadFlights()
    } else {
      setLoading(false)
      setError('Flight search information is missing.')
    }
  }, [from, to, date])

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/search-flights"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Modify Search
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            Available Flights
          </h1>

          <p className="text-slate-600 mt-2">
            {from} → {to} · {date} · {passengers} passenger
            {passengers !== '1' ? 's' : ''}
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <div className="text-4xl mb-4">✈️</div>

            <p className="text-slate-600">
              Searching for available flights...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-white rounded-2xl border border-red-200 p-10 text-center">
            <div className="text-4xl mb-4">⚠️</div>

            <h2 className="text-xl font-semibold text-slate-900">
              Unable to load flights
            </h2>

            <p className="text-red-600 mt-2">
              {error}
            </p>

            <Link
              to="/search-flights"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Search Again
            </Link>
          </div>
        )}

        {!loading && !error && flights.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <div className="text-5xl mb-4">✈️</div>

            <h2 className="text-xl font-semibold text-slate-900">
              No flights found
            </h2>

            <p className="text-slate-600 mt-2">
              There are no available flights for this route and date.
            </p>

            <Link
              to="/search-flights"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Search Again
            </Link>
          </div>
        )}

        {!loading && !error && flights.length > 0 && (
          <div className="space-y-5">
            {flights.map((flight) => (
              <div
                key={flight._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  <div>
                    <p className="text-sm text-slate-500">
                      Airline
                    </p>

                    <h2 className="font-bold text-slate-900 mt-1">
                      {flight.airline}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {flight.flightNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Departure
                    </p>

                    <p className="text-xl font-bold text-slate-900 mt-1">
                      {flight.departureTime}
                    </p>

                    <p className="text-sm text-slate-600">
                      {flight.from}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Duration
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {flight.duration}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      → Direct Flight
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Arrival
                    </p>

                    <p className="text-xl font-bold text-slate-900 mt-1">
                      {flight.arrivalTime}
                    </p>

                    <p className="text-sm text-slate-600">
                      {flight.to}
                    </p>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-sm text-slate-500">
                      Price
                    </p>

                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      ৳{flight.price.toLocaleString()}
                    </p>

                    <p className="text-xs text-slate-500 mb-3">
                      {flight.availableSeats} seats available
                    </p>

                    <Link
                      to={`/booking/${flight._id}`}
                      state={{
                        flight,
                        passengers: Number(passengers),
                      }}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
                    >
                      Select Flight
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



export default FlightResults