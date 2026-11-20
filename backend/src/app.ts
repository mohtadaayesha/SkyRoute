import express from 'express'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import flightRoutes from './routes/flightRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Airline Ticketing System API is running',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/flights', flightRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/admin', adminRoutes)

export default app