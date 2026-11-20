import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  function change(field: keyof typeof form, value: string) { setForm(current => ({ ...current, [field]: value })) }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('')
    if (form.password.length < 8) { setError('Password must contain at least 8 characters.'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    setLoading(true)
    try {
      const payload = { fullName: form.fullName, email: form.email, phone: form.phone, password: form.password }
      const response = await fetch('http://localhost:5000/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await response.json()
      if (!response.ok) { setError(data.message || 'Registration failed'); return }
      navigate('/login', { state: { registered: true } })
    } catch { setError('Cannot connect to the server. Start the backend and try again.') }
    finally { setLoading(false) }
  }
  return <div className="min-h-screen bg-slate-100"><Navbar /><main className="max-w-md mx-auto px-6 py-12"><div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"><div className="text-center mb-7"><div className="text-4xl">🧳</div><h1 className="text-3xl font-bold mt-3">Create Account</h1><p className="text-slate-500 mt-2">Register to start booking flights.</p></div>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 text-red-700 p-3">{error}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">{([['fullName','Full Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['password','Password','password'],['confirmPassword','Confirm Password','password']] as const).map(([field,label,type]) => <div key={field}><label htmlFor={field} className="block text-sm font-medium mb-2">{label}</label><input id={field} type={type} required value={form[field]} onChange={e => change(field,e.target.value)} className="w-full border rounded-lg px-4 py-3" /></div>)}<button disabled={loading} className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3">{loading ? 'Creating account...' : 'Create Account'}</button></form>
    <p className="text-center text-sm text-slate-600 mt-6">Already registered? <Link to="/login" className="text-blue-600 font-semibold">Login</Link></p></div></main></div>
}
export default Register
