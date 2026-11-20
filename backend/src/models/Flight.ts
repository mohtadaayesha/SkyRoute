import mongoose, { Schema, Document } from 'mongoose'

export interface IFlight extends Document {
  airline: string
  flightNumber: string
  from: string
  to: string
  departureDate: Date
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  totalSeats: number
  availableSeats: number
  status: 'scheduled' | 'cancelled'
}

const flightSchema = new Schema<IFlight>(
  {
    airline: {
      type: String,
      required: true,
      trim: true,
    },

    flightNumber: {
      type: String,
      required: true,
      trim: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    departureDate: {
      type: Date,
      required: true,
    },

    departureTime: {
      type: String,
      required: true,
      trim: true,
    },

    arrivalTime: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ['scheduled', 'cancelled'],
      default: 'scheduled',
    },
  },
  {
    timestamps: true,
  },
)

const Flight = mongoose.model<IFlight>('Flight', flightSchema)

export default Flight