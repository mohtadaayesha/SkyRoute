import type { Request, Response } from 'express'
import { searchFlights } from '../services/flightService.js'

export async function search(req: Request, res: Response) {
  try {
    const { from, to, date, passengers } = req.query

    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: 'From, to, and date are required',
      })
    }

    const flights = await searchFlights({
      from: String(from),
      to: String(to),
      date: String(date),
      passengers: passengers ? Number(passengers) : 1,
    })

    return res.status(200).json({
      success: true,
      flights,
    })
  } catch (error) {
    console.error('Flight search error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to search for flights',
    })
  }
}