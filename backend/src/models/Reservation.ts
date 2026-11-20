import mongoose, { Schema, Document } from 'mongoose'

export interface IReservation extends Document {
  userId: mongoose.Types.ObjectId
  flightId: mongoose.Types.ObjectId
  passengerFirstName: string
  passengerLastName: string
  passengerEmail: string
  passengerPhone: string
  passportOrId: string
  passengers: number
  totalPrice: number
  status: 'confirmed' | 'cancelled'
}

const reservationSchema = new Schema<IReservation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    flightId: {
      type: Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },

    passengerFirstName: {
      type: String,
      required: true,
      trim: true,
    },

    passengerLastName: {
      type: String,
      required: true,
      trim: true,
    },

    passengerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    passengerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    passportOrId: {
      type: String,
      required: true,
      trim: true,
    },

    passengers: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  },
)

const Reservation = mongoose.model<IReservation>(
  'Reservation',
  reservationSchema,
)

export default Reservation