import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

function safeRedirectPath(next: string | null): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return '/'
  }
  return next
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
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        await prisma.profile.upsert({
          where: { id: user.id },
          update: { email: user.email },
          create: {
            id: user.id,
            email: user.email,
            firstName: user.user_metadata?.full_name?.split(' ')[0]
              ?? user.user_metadata?.first_name
              ?? null,
            lastName: user.user_metadata?.full_name?.split(' ').slice(1).join(' ')
              ?? user.user_metadata?.last_name
              ?? null,
          },
        })
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login`)
}
