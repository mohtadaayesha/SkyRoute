import type { Request, Response } from 'express'
import type { AuthRequest } from '../middleware/authMiddleware.js'
import {
  createReservation,
  getMyReservations,
  getReservationById,
  cancelReservation,
} from '../services/reservationService.js'

export async function create(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const {
      flightId,
      passengerFirstName,
      passengerLastName,
      passengerEmail,
      passengerPhone,
      passportOrId,
      passengers,
    } = req.body

    if (
      !flightId ||
      !passengerFirstName ||
      !passengerLastName ||
      !passengerEmail ||
      !passengerPhone ||
      !passportOrId ||
      !passengers
    ) {
      return res.status(400).json({
        success: false,
        message: 'All booking fields are required',
      })
    }

    const passengerCount = Number(passengers)

    if (
      !Number.isInteger(passengerCount) ||
      passengerCount < 1
    ) {
      return res.status(400).json({
        success: false,
        message: 'Passenger count must be a positive number',
      })
    }

    const reservation = await createReservation({
      userId: req.user.userId,
      flightId: String(flightId),
      passengerFirstName: String(passengerFirstName),
      passengerLastName: String(passengerLastName),
      passengerEmail: String(passengerEmail),
      passengerPhone: String(passengerPhone),
      passportOrId: String(passportOrId),
      passengers: passengerCount,
    })

    return res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to create reservation'

    return res.status(400).json({
      success: false,
      message,
    })
  }
}

export async function getMine(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const reservations = await getMyReservations(
      req.user.userId,
    )

    return res.status(200).json({
      success: true,
      reservations,
    })
  } catch (error) {
    console.error('Get reservations error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to load reservations',
    })
  }
}

export async function getOne(
  req: AuthRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const reservation = await getReservationById(
      req.params.id,
      req.user.userId,
    )

    return res.status(200).json({
      success: true,
      reservation,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to load reservation'

    return res.status(404).json({
      success: false,
      message,
    })
  }
}

export async function cancel(
  req: AuthRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const reservation = await cancelReservation(
      req.params.id,
      req.user.userId,
    )

    return res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully',
      reservation,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to cancel reservation'

    return res.status(400).json({
      success: false,
      message,
    })
  }
}