import type { Response } from 'express'
import mongoose from 'mongoose'
import Flight from '../models/Flight.js'
import User from '../models/User.js'
import type { AuthRequest } from '../middleware/authMiddleware.js'

export async function listFlights(_req: AuthRequest, res: Response) {
  const flights = await Flight.find().sort({ departureDate: 1, departureTime: 1 })
  return res.json({ success: true, flights })
}

export async function createFlight(req: AuthRequest, res: Response) {
  try {
    const { airline, flightNumber, from, to, departureDate, departureTime, arrivalTime, duration, price, totalSeats } = req.body
    if (!airline || !flightNumber || !from || !to || !departureDate || !departureTime || !arrivalTime || !duration || price == null || totalSeats == null) {
      return res.status(400).json({ success: false, message: 'All flight fields are required' })
    }
    if (Number(price) < 0 || !Number.isInteger(Number(totalSeats)) || Number(totalSeats) < 1) {
      return res.status(400).json({ success: false, message: 'Price and seat count are invalid' })
    }
    const flight = await Flight.create({ airline, flightNumber, from, to, departureDate: new Date(departureDate), departureTime, arrivalTime, duration, price: Number(price), totalSeats: Number(totalSeats), availableSeats: Number(totalSeats), status: 'scheduled' })
    return res.status(201).json({ success: true, flight })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create flight'
    return res.status(400).json({ success: false, message })
  }
}

export async function updateFlight(req: AuthRequest & { params: { id: string } }, res: Response) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid flight ID' })
  try {
    const updates = { ...req.body }
    delete updates.availableSeats
    delete updates.totalSeats
    delete updates.status
    const flight = await Flight.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' })
    return res.json({ success: true, flight })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update flight'
    return res.status(400).json({ success: false, message })
  }
}

export async function cancelFlight(req: AuthRequest & { params: { id: string } }, res: Response) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid flight ID' })
  const flight = await Flight.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true })
  if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' })
  return res.json({ success: true, flight, message: 'Flight cancelled' })
}

export async function listUsers(_req: AuthRequest, res: Response) {
  const users = await User.find().select('-password').sort({ createdAt: -1 })
  return res.json({ success: true, users })
}
