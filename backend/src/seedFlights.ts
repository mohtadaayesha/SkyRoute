import 'dotenv/config'
import mongoose from 'mongoose'
import Flight from './models/Flight.js'

function dateAfter(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

const flights = [
  { airline: 'Biman Bangladesh Airlines', flightNumber: 'BG-101', from: 'Dhaka', to: 'Chattogram', departureDate: dateAfter(7), departureTime: '08:00 AM', arrivalTime: '09:00 AM', duration: '1h 00m', price: 4500, totalSeats: 180, availableSeats: 180, status: 'scheduled' },
  { airline: 'US-Bangla Airlines', flightNumber: 'BS-203', from: 'Dhaka', to: 'Chattogram', departureDate: dateAfter(7), departureTime: '11:30 AM', arrivalTime: '12:35 PM', duration: '1h 05m', price: 5200, totalSeats: 164, availableSeats: 164, status: 'scheduled' },
  { airline: 'Air Astra', flightNumber: '2A-501', from: 'Dhaka', to: 'Chattogram', departureDate: dateAfter(8), departureTime: '04:00 PM', arrivalTime: '05:05 PM', duration: '1h 05m', price: 4800, totalSeats: 144, availableSeats: 144, status: 'scheduled' },
  { airline: 'Biman Bangladesh Airlines', flightNumber: 'BG-301', from: 'Chattogram', to: 'Dhaka', departureDate: dateAfter(9), departureTime: '09:00 AM', arrivalTime: '10:00 AM', duration: '1h 00m', price: 4600, totalSeats: 180, availableSeats: 180, status: 'scheduled' },
  { airline: 'US-Bangla Airlines', flightNumber: 'BS-211', from: 'Dhaka', to: 'Sylhet', departureDate: dateAfter(10), departureTime: '10:15 AM', arrivalTime: '11:05 AM', duration: '50m', price: 3900, totalSeats: 164, availableSeats: 164, status: 'scheduled' },
  { airline: 'Biman Bangladesh Airlines', flightNumber: 'BG-401', from: 'Dhaka', to: 'Cox’s Bazar', departureDate: dateAfter(11), departureTime: '01:30 PM', arrivalTime: '02:35 PM', duration: '1h 05m', price: 6200, totalSeats: 180, availableSeats: 180, status: 'scheduled' },
]

async function seedFlights() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not configured')
  try {
    await mongoose.connect(uri)
    for (const flight of flights) {
      await Flight.updateOne({ flightNumber: flight.flightNumber }, { $setOnInsert: flight }, { upsert: true })
    }
    console.log(`${flights.length} sample flights checked/seeded. Existing flights were preserved.`)
  } finally {
    await mongoose.disconnect()
  }
}
seedFlights().catch(error => { console.error('Flight seeding failed:', error); process.exitCode = 1 })
