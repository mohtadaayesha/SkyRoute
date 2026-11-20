import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      {/* Hero Section */}
      <main>
        <section className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 text-center">

            <p className="text-blue-400 font-semibold text-lg mb-4">
              Welcome to Airline Ticketing System
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Journey Starts Here ✈️
            </h1>

            <p className="max-w-2xl mx-auto text-slate-300 text-lg leading-8 mb-8">
              Search for flights, book your tickets, and manage your
              reservations from one simple and convenient platform.
            </p>

            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700
                         text-white font-semibold px-8 py-3 rounded-lg
                         transition"
            >
              Get Started
            </Link>

          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything You Need
            </h2>

            <p className="text-slate-600 mt-3">
              Manage your airline reservations with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">
                🔍
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Search Flights
              </h3>

              <p className="text-slate-600 leading-7">
                Find available flights based on your travel requirements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">
                🎫
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Book Tickets
              </h3>

              <p className="text-slate-600 leading-7">
                Reserve your seat and manage your airline bookings easily.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">
                📋
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Manage Reservations
              </h3>

              <p className="text-slate-600 leading-7">
                View your reservations and manage your booking information.
              </p>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}

export default Home