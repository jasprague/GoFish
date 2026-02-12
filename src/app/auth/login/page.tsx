'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type AuthMode = 'login' | 'signup' | 'magic-link'

export default function LoginPage() {
  const supabase = createClient()

  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const resetMessages = () => {
    setMessage('')
    setError('')
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    resetMessages()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/'
    }

    setLoading(false)
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    resetMessages()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for a confirmation link.')
    }

    setLoading(false)
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    resetMessages()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for a magic link.')
    }

    setLoading(false)
  }

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    resetMessages()
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    }
  }

  return (
    <main className="min-h-screen bg-[#114562] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <h1 className="text-2xl text-center text-[#114562] mb-6">
          {mode === 'login' && 'Sign In'}
          {mode === 'signup' && 'Create Account'}
          {mode === 'magic-link' && 'Magic Link'}
        </h1>

        {/* OAuth Providers */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="w-full p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-gray-700"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('facebook')}
            className="w-full p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-gray-700"
          >
            Continue with Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        {/* Email + Password Login */}
        {mode === 'login' && (
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-[#E98F35] text-white rounded-md hover:bg-[#d07e2a] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Email + Password Signup */}
        {mode === 'signup' && (
          <form onSubmit={handleEmailSignup} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-1/2 p-3 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="p-3 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-[#E98F35] text-white rounded-md hover:bg-[#d07e2a] disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Magic Link */}
        {mode === 'magic-link' && (
          <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-[#E98F35] text-white rounded-md hover:bg-[#d07e2a] disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {message && <p className="text-green-600 text-sm mt-3">{message}</p>}

        {/* Mode Switchers */}
        <div className="mt-6 text-center text-sm text-gray-600 flex flex-col gap-2">
          {mode !== 'login' && (
            <button onClick={() => { setMode('login'); resetMessages() }} className="hover:underline">
              Already have an account? Sign in
            </button>
          )}
          {mode !== 'signup' && (
            <button onClick={() => { setMode('signup'); resetMessages() }} className="hover:underline">
              Need an account? Sign up
            </button>
          )}
          {mode !== 'magic-link' && (
            <button onClick={() => { setMode('magic-link'); resetMessages() }} className="hover:underline">
              Sign in with magic link
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
