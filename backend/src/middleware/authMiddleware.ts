import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    role: 'user' | 'admin'
  }
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing',
      })
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: 'JWT_SECRET is not configured',
      })
    }

    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string
      role: 'user' | 'admin'
    }

    req.user = decoded

    next()
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token',
    })
  }
}