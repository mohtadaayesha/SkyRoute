import type { Request, Response } from 'express'
import {
  loginUser,
  registerUser,
} from '../services/authService.js'

export async function register(req: Request, res: Response) {
  try {
    const { fullName, email, phone, password } = req.body

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const user = await registerUser({
      fullName,
      email,
      phone,
      password,
    })

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Registration failed'

    return res.status(400).json({
      success: false,
      message,
    })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const result = await loginUser(email, password)

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      ...result,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Login failed'

    return res.status(401).json({
      success: false,
      message,
    })
  }
}