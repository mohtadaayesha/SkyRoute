import { Link } from 'react-router-dom'

function HomePlum() {
  return (
    <div className="min-h-screen bg-[#D8EFFD]">

      {/* Navbar */}
      <nav className="bg-[#341F28] text-[#D8EFFD]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link to="/design-plum" className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>

            <span className="text-xl font-bold">
              Airline Ticketing System
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/design-plum"
              className="hover:text-white font-medium"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="hover:text-white font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-[#D8EFFD] text-[#341F28]
                         hover:bg-white
                         font-semibold px-4 py-2 rounded-lg
                         transition"
            >
              Register
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <main>

        <section className="bg-[#D8EFFD]">
          <div className="max-w-7xl mx-auto px-6 py-28">

            <div className="max-w-3xl">

              <p className="text-[#341F28] font-semibold text-lg mb-4">
                AIR TRAVEL, SIMPLIFIED
              </p>

              <h1 className="text-5xl md:text-7xl font-bold
                             text-[#341F28] leading-tight mb-6">
                Your Next
                <br />
                Journey Awaits.
              </h1>

              <p className="text-[#341F28] text-lg md:text-xl
                            leading-8 max-w-2xl mb-10">
                Discover flights, book your journey, and
                keep your reservations organized in one place.
              </p>

              <div className="flex flex-wrap gap-4">

                <Link
                  to="/login"
                  className="bg-[#341F28] text-[#D8EFFD]
                             hover:bg-[#24151C]
                             font-semibold px-8 py-4 rounded-lg
                             transition"
                >
                  Explore Flights →
                </Link>

                <Link
                  to="/register"
                  className="border-2 border-[#341F28]
                             text-[#341F28]
                             hover:bg-[#341F28]
                             hover:text-[#D8EFFD]
                             font-semibold px-8 py-4 rounded-lg
                             transition"
                >
                  Get Started
                </Link>

              </div>

            </div>

          </div>
        </section>

        {/* Features */}
        <section className="bg-[#341F28] text-[#D8EFFD]">
          <div className="max-w-7xl mx-auto px-6 py-16">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div>
                <div className="text-4xl mb-4">🌍</div>

                <h2 className="text-xl font-bold mb-2">
                  Explore Destinations
                </h2>

                <p className="text-slate-300 leading-7">
                  Search available flights and discover
                  destinations for your next journey.
                </p>
              </div>

              <div>
                <div className="text-4xl mb-4">✈️</div>

                <h2 className="text-xl font-bold mb-2">
                  Book Your Flight
                </h2>

                <p className="text-slate-300 leading-7">
                  Choose your preferred flight and complete
                  your reservation with ease.
                </p>
              </div>

              <div>
                <div className="text-4xl mb-4">🧳</div>

                <h2 className="text-xl font-bold mb-2">
                  Manage Your Journey
                </h2>

                <p className="text-slate-300 leading-7">
                  Keep track of your reservations and manage
                  your travel information in one place.
                </p>
              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  )
}

export default HomePlum