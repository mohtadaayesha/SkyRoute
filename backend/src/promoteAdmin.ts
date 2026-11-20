import 'dotenv/config'
import mongoose from 'mongoose'
import User from './models/User.js'

async function promoteAdmin() {
  const uri = process.env.MONGODB_URI
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim()
  if (!uri || !email) throw new Error('Set MONGODB_URI and ADMIN_EMAIL in backend/.env first')
  await mongoose.connect(uri)
  try {
    const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true })
    if (!user) throw new Error(`No registered user found with email ${email}. Register that account first.`)
    console.log(`Administrator role assigned to ${user.email}`)
  } finally { await mongoose.disconnect() }
}
promoteAdmin().catch(error => { console.error(error); process.exitCode = 1 })
