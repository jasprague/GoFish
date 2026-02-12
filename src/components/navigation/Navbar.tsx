'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import Button from '../button/Button'

const Navbar = () => {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="flex justify-end w-full z-10 p-10 text-white text-2xl">
      <ul className="flex flex-row gap-10 items-center">
        <Button
          text="Donate"
          link="https://www.paypal.com/donate?token=1K3uR2fNb5z1-dRLYrkQmh7J2EuzzLpgVtgayLhGBQtKLpgRZVZ7zAWEyR0r2glvO9h_Tehuu5oQkpcA"
          variant="alt"
        />
        {user ? (
          <li>
            <button onClick={handleSignOut} className="hover:underline text-lg">
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <Button text="Sign In" link="/auth/login" variant="default" />
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
