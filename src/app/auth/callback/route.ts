import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

const MAX_NAME_LENGTH = 255

function safeRedirectPath(next: string | null): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return '/'
  }
  return next
}

function sanitizeName(val: unknown): string | null {
  if (typeof val !== 'string') return null
  const trimmed = val.trim()
  if (trimmed.length === 0) return null
  return trimmed.slice(0, MAX_NAME_LENGTH)
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = safeRedirectPath(searchParams.get('next'))

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Auto-create profile for OAuth users on first login
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          const fullName = sanitizeName(user.user_metadata?.full_name)
          await prisma.profile.upsert({
            where: { id: user.id },
            update: { email: user.email },
            create: {
              id: user.id,
              email: user.email,
              firstName: fullName?.split(' ')[0]
                ?? sanitizeName(user.user_metadata?.first_name),
              lastName: fullName?.split(' ').slice(1).join(' ') || null
                ?? sanitizeName(user.user_metadata?.last_name),
            },
          })
        }
      } catch {
        // Profile sync failed but auth succeeded — user can retry via /api/profile
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login`)
}
