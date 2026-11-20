import mongoose from 'mongoose'
import Flight from '../models/Flight.js'
import Reservation from '../models/Reservation.js'

interface CreateReservationData {
  userId: string
  flightId: string
  passengerFirstName: string
  passengerLastName: string
  passengerEmail: string
  passengerPhone: string
  passportOrId: string
  passengers: number
}

export async function createReservation(
  data: CreateReservationData,
) {
  const {
    userId,
    flightId,
    passengerFirstName,
    passengerLastName,
    passengerEmail,
    passengerPhone,
    passportOrId,
    passengers,
  } = data

  if (!mongoose.Types.ObjectId.isValid(flightId)) {
    throw new Error('Invalid flight ID')
  }

  if (passengers < 1) {
    throw new Error('At least one passenger is required')
  }

  const flight = await Flight.findById(flightId)

  if (!flight) {
    throw new Error('Flight not found')
  }

  if (flight.status === 'cancelled') {
    throw new Error('This flight has been cancelled')
  }

  const existingReservation = await Reservation.findOne({
    userId,
    flightId,
    passportOrId,
    status: 'confirmed',
  })

  if (existingReservation) {
    throw new Error(
      'A reservation already exists for this passenger on this flight',
    )
  }

  const totalPrice = flight.price * passengers

  const updatedFlight = await Flight.findOneAndUpdate(
    {
      _id: flightId,
      status: 'scheduled',
      availableSeats: {
        $gte: passengers,
      },
    },
    {
      $inc: {
        availableSeats: -passengers,
      },
    },
    {
      new: true,
    },
  )

  if (!updatedFlight) {
    throw new Error(
      'Not enough seats are available for this booking',
    )
  }

  try {
    const reservation = await Reservation.create({
      userId,
      flightId,
      passengerFirstName,
      passengerLastName,
      passengerEmail,
      passengerPhone,
      passportOrId,
      passengers,
      totalPrice,
      status: 'confirmed',
    })

    return reservation
  } catch (error) {
    // Restore the seats if reservation creation fails.
    await Flight.findByIdAndUpdate(flightId, {
      $inc: {
        availableSeats: passengers,
      },
    })

    throw error
  }
}

export async function getMyReservations(userId: string) {
  const reservations = await Reservation.find({
    userId,
  })
    .populate(
      'flightId',
      'airline flightNumber from to departureDate departureTime arrivalTime duration price',
    )
    .sort({
      createdAt: -1,
    })

  return reservations
}

export async function getReservationById(
  reservationId: string,
  userId: string,
) {
  if (!mongoose.Types.ObjectId.isValid(reservationId)) {
    throw new Error('Invalid reservation ID')
  }

  const reservation = await Reservation.findOne({
    _id: reservationId,
    userId,
  }).populate(
    'flightId',
    'airline flightNumber from to departureDate departureTime arrivalTime duration price',
  )

  if (!reservation) {
    throw new Error('Reservation not found')
  }

  return reservation
}

export async function cancelReservation(
  reservationId: string,
  userId: string,
) {
  if (!mongoose.Types.ObjectId.isValid(reservationId)) {
    throw new Error('Invalid reservation ID')
  }

  // Change the reservation state conditionally so two cancellation requests
  // cannot restore the same seats twice.
  const reservation = await Reservation.findOneAndUpdate(
    { _id: reservationId, userId, status: 'confirmed' },
    { $set: { status: 'cancelled' } },
    { new: true },
  )

  if (!reservation) {
    const existing = await Reservation.findOne({ _id: reservationId, userId })
    if (!existing) throw new Error('Reservation not found')
    throw new Error('This reservation has already been cancelled')
  }

  const associatedFlight = await Flight.findById(reservation.flightId)
  if (!associatedFlight) {
    await Reservation.findByIdAndUpdate(reservationId, { $set: { status: 'confirmed' } })
    throw new Error('Associated flight not found')
  }

  const flight = await Flight.findOneAndUpdate(
    {
      _id: reservation.flightId,
      availableSeats: { $lte: associatedFlight.totalSeats - reservation.passengers },
    },
    { $inc: { availableSeats: reservation.passengers } },
    { new: true },
  )

  if (!flight) {
    // Compensate if the associated flight could not be updated.
    await Reservation.findByIdAndUpdate(reservationId, { $set: { status: 'confirmed' } })
    throw new Error('Unable to restore seats for this reservation')
  }

  return reservation.populate('flightId', 'airline flightNumber from to departureDate departureTime arrivalTime duration price')
}
