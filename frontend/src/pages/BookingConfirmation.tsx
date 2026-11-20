import { Link, useLocation } from 'react-router-dom'

type Reservation = {
  _id: string
  passengerFirstName: string
  passengerLastName: string
  passengers: number
  totalPrice: number
  status: string
}

type Flight = {
  airline: string
  flightNumber: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
}

type LocationState = {
  reservation?: Reservation
  flight?: Flight
}

function BookingConfirmation() {
  const location = useLocation()

  const state = location.state as LocationState | null

  const reservation = state?.reservation
  const flight = state?.flight

  if (!reservation) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900">
            Reservation information unavailable
          </h1>

          <Link
            to="/dashboard"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <div className="text-6xl mb-5">✅</div>

          <h1 className="text-3xl font-bold text-slate-900">
            Booking Confirmed!
          </h1>

          <p className="text-slate-600 mt-2">
            Your flight reservation has been successfully created.
          </p>

          <div className="text-left mt-8 border border-slate-200 rounded-xl p-6 space-y-5">
            <div>
              <p className="text-sm text-slate-500">
                Reservation ID
              </p>

              <p className="font-semibold text-slate-900 break-all">
                {reservation._id}
              </p>
            </div>

            {flight && (
              <>
                <div>
                  <p className="text-sm text-slate-500">
                    Airline
                  </p>

                  <p className="font-semibold text-slate-900">
                    {flight.airline} · {flight.flightNumber}
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
              </>
            )}

            <div>
              <p className="text-sm text-slate-500">
                Passenger
              </p>

              <p className="font-semibold text-slate-900">
                {reservation.passengerFirstName}{' '}
                {reservation.passengerLastName}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Passengers
              </p>

              <p className="font-semibold text-slate-900">
                {reservation.passengers}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Price
              </p>

              <p className="text-2xl font-bold text-blue-600">
                ৳{reservation.totalPrice.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Status
              </p>

              <span className="inline-block mt-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {reservation.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/dashboard"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/search-flights"
              className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg"
            >
              Book Another Flight
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation