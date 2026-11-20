import { Router } from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/roleMiddleware.js'
import { cancelFlight, createFlight, listFlights, listUsers, updateFlight } from '../controllers/adminController.js'

const router = Router()
router.use(authenticate, requireAdmin)
router.get('/flights', listFlights)
router.post('/flights', createFlight)
router.patch('/flights/:id', updateFlight)
router.patch('/flights/:id/cancel', cancelFlight)
router.get('/users', listUsers)
export default router
