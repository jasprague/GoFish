import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

/// GET /api/profile — returns the current user's profile
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
  })

  return NextResponse.json({ profile })
}

/// POST /api/profile — creates or updates the profile for the authenticated user
export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await req.json()
  const firstName = body.firstName ?? user.user_metadata?.first_name ?? null
  const lastName = body.lastName ?? user.user_metadata?.last_name ?? null

  const profile = await prisma.profile.upsert({
    where: { id: user.id },
    update: {
      firstName,
      lastName,
      email: user.email!,
    },
    create: {
      id: user.id,
      email: user.email!,
      firstName,
      lastName,
    },
  })

  return NextResponse.json({ profile })
}
