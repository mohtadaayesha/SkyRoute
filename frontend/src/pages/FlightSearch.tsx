import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function FlightSearch() {
  const navigate = useNavigate()

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState('1')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError('')

    if (!from || !to || !date) {
      setError('Please fill in all required fields.')
      return
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setError('Departure and destination cannot be the same.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `http://localhost:5000/api/flights/search?from=${encodeURIComponent(
          from,
        )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&passengers=${encodeURIComponent(passengers)}`,
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Unable to search for flights.')
        return
      }

      navigate(
        `/flight-results?from=${encodeURIComponent(
          from,
        )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(
          date,
        )}&passengers=${encodeURIComponent(passengers)}`,
        {
          state: {
            flights: data.flights,
          },
        },
      )
    } catch {
      setError(
        'Unable to connect to the server. Please make sure the backend is running.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">✈️</div>

          <h1 className="text-3xl font-bold text-slate-900">
            Search Flights
          </h1>

          <p className="text-slate-600 mt-2">
            Find available flights for your journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  From
                </label>

                <input
                  type="text"
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                  placeholder="e.g. Dhaka"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  To
                </label>

                <input
                  type="text"
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder="e.g. Chattogram"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Departure Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Passengers
                </label>

                <select
                  value={passengers}
                  onChange={(event) =>
                    setPassengers(event.target.value)
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5 Passengers</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Searching Flights...' : 'Search Flights'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FlightSearch