import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

interface RegisterData {
  fullName: string
  email: string
  phone: string
  password: string
}

export async function registerUser(data: RegisterData) {
  const { fullName, phone, password } = data
  const normalizedEmail = data.email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) throw new Error('Please provide a valid email address')
  if (password.length < 8) throw new Error('Password must contain at least 8 characters')

  const existingUser = await User.findOne({ email: normalizedEmail })

  if (existingUser) {
    throw new Error('An account with this email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    fullName,
    email: normalizedEmail,
    phone,
    password: hashedPassword,
    role: 'user',
  })

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email: email.trim().toLowerCase() })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const passwordMatches = await bcrypt.compare(password, user.password)

  if (!passwordMatches) {
    throw new Error('Invalid email or password')
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured')
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    jwtSecret,
    {
      expiresIn: '1d',
    },
  )

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  }
}