import { Link } from 'react-router-dom'

function HomeIcy() {
  return (
    <div className="min-h-screen bg-[#A4D8FF]">

      {/* Navbar */}
      <nav className="bg-[#35393C] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link to="/design-icy" className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>

            <span className="text-xl font-bold">
              Airline Ticketing System
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/design-icy"
              className="text-white hover:text-[#A4D8FF] font-medium"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-white hover:text-[#A4D8FF] font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-[#A4D8FF] text-[#35393C]
                         hover:bg-white font-semibold
                         px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <main>

        <section className="bg-[#A4D8FF]">
          <div className="max-w-7xl mx-auto px-6 py-28">

            <div className="max-w-3xl">

              <p className="text-[#35393C] font-semibold text-lg mb-4">
                YOUR JOURNEY STARTS HERE
              </p>

              <h1 className="text-5xl md:text-7xl font-bold
                             text-[#35393C] leading-tight mb-6">
                Travel Further.
                <br />
                Fly Smarter.
              </h1>

              <p className="text-[#35393C] text-lg md:text-xl
                            leading-8 max-w-2xl mb-10">
                Search flights, reserve your seat, and manage
                your airline reservations with ease.
              </p>

              <div className="flex flex-wrap gap-4">

                <Link
                  to="/login"
                  className="bg-[#35393C] text-white
                             hover:bg-[#25282A]
                             font-semibold px-8 py-4 rounded-lg
                             transition"
                >
                  Book a Flight →
                </Link>

                <Link
                  to="/register"
                  className="border-2 border-[#35393C]
                             text-[#35393C]
                             hover:bg-[#35393C]
                             hover:text-white
                             font-semibold px-8 py-4 rounded-lg
                             transition"
                >
                  Create Account
                </Link>

              </div>

            </div>

          </div>
        </section>

        {/* Features */}
        <section className="bg-[#35393C] text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div>
                <div className="text-4xl mb-4">🔍</div>

                <h2 className="text-xl font-bold mb-2">
                  Search Flights
                </h2>

                <p className="text-slate-300 leading-7">
                  Find flights that match your destination,
                  schedule, and travel requirements.
                </p>
              </div>

              <div>
                <div className="text-4xl mb-4">🎫</div>

                <h2 className="text-xl font-bold mb-2">
                  Easy Booking
                </h2>

                <p className="text-slate-300 leading-7">
                  Select your flight and reserve your seat
                  through a simple booking process.
                </p>
              </div>

              <div>
                <div className="text-4xl mb-4">📋</div>

                <h2 className="text-xl font-bold mb-2">
                  Manage Reservations
                </h2>

                <p className="text-slate-300 leading-7">
                  View and manage your reservations whenever
                  you need them.
                </p>
              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  )
}

export default HomeIcy