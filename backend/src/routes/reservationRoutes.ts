import { Router } from 'express'

import {
  create,
  getMine,
  getOne,
  cancel,
} from '../controllers/reservationController.js'

import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', authenticate, create)

router.get('/my', authenticate, getMine)

router.get('/:id', authenticate, getOne)

router.patch('/:id/cancel', authenticate, cancel)

export default router