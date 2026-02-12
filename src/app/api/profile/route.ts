import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/generated/prisma'

const MAX_NAME_LENGTH = 255

function sanitizeString(val: unknown, maxLength: number): string | null {
  if (typeof val !== 'string') return null
  const trimmed = val.trim()
  if (trimmed.length === 0) return null
  return trimmed.slice(0, maxLength)
}

function parseRole(val: unknown): UserRole | null {
  if (val === 'CAPTAIN' || val === 'CREW') return val
  return null
}

const PROFILE_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  createdAt: true,
} as const

/// GET /api/profile — returns the current user's profile
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: PROFILE_SELECT,
  })

  return NextResponse.json({ profile })
}

/// POST /api/profile — creates or updates the profile for the authenticated user
export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const firstName = sanitizeString(body.firstName, MAX_NAME_LENGTH)
    ?? sanitizeString(user.user_metadata?.first_name, MAX_NAME_LENGTH)
  const lastName = sanitizeString(body.lastName, MAX_NAME_LENGTH)
    ?? sanitizeString(user.user_metadata?.last_name, MAX_NAME_LENGTH)
  const role = parseRole(body.role)

  const profile = await prisma.profile.upsert({
    where: { id: user.id },
    update: {
      firstName,
      lastName,
      email: user.email,
      ...(role !== null && { role }),
    },
    create: {
      id: user.id,
      email: user.email,
      firstName,
      lastName,
      role,
    },
    select: PROFILE_SELECT,
  })

  return NextResponse.json({ profile })
}
