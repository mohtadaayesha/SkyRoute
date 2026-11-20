import Flight from '../models/Flight.js'

interface SearchFlightsData {
  from: string
  to: string
  date: string
  passengers?: number
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function searchFlights(data: SearchFlightsData) {
  const from = data.from.trim()
  const to = data.to.trim()
  const date = new Date(`${data.date}T00:00:00.000Z`)
  const passengers = data.passengers ?? 1

  if (Number.isNaN(date.getTime())) throw new Error('Invalid departure date')
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 9) throw new Error('Passenger count must be between 1 and 9')

  const startOfDay = date
  const endOfDay = new Date(date.getTime() + 24 * 60 * 60 * 1000 - 1)
  return Flight.find({
    from: { $regex: `^${escapeRegex(from)}$`, $options: 'i' },
    to: { $regex: `^${escapeRegex(to)}$`, $options: 'i' },
    departureDate: { $gte: startOfDay, $lte: endOfDay },
    status: 'scheduled',
    availableSeats: { $gte: passengers },
  }).sort({ departureTime: 1 })
}
