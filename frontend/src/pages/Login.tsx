import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) { setError(data.message || 'Login failed'); return }
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate(data.user?.role === 'admin' ? '/admin' : '/dashboard')
    } catch { setError('Cannot connect to the server. Start the backend and try again.') }
    finally { setLoading(false) }
  }

  return <div className="min-h-screen bg-slate-100"><Navbar /><main className="max-w-md mx-auto px-6 py-16"><div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"><div className="text-center mb-7"><div className="text-4xl">✈️</div><h1 className="text-3xl font-bold mt-3">Welcome Back</h1><p className="text-slate-500 mt-2">Login to manage your reservations.</p></div>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 text-red-700 p-3">{error}</p>}
    <form onSubmit={handleSubmit} className="space-y-5"><div><label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-lg px-4 py-3" placeholder="you@example.com" /></div><div><label htmlFor="password" className="block text-sm font-medium mb-2">Password</label><input id="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-4 py-3" placeholder="Your password" /></div><button disabled={loading} className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3">{loading ? 'Signing in...' : 'Login'}</button></form>
    <p className="text-center text-sm text-slate-600 mt-6">Don't have an account? <Link className="text-blue-600 font-semibold" to="/register">Create an account</Link></p></div></main></div>
}
export default Login
