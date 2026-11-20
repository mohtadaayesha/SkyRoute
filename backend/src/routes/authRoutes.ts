import { Router } from 'express'
import { login, register } from '../controllers/authController.js'
import { authenticate } from '../middleware/authMiddleware.js'
import type { AuthRequest } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.get('/me', authenticate, (req: AuthRequest, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  })
})

export default router