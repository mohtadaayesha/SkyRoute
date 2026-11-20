import { Router } from 'express'
import { search } from '../controllers/flightController.js'

const router = Router()

router.get('/search', search)

export default router