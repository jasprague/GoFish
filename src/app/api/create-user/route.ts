import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const MAX_NAME_LENGTH = 255;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeString(val: unknown, maxLength: number): string | null {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const firstName = sanitizeString(body.firstName, MAX_NAME_LENGTH);
  const lastName = sanitizeString(body.lastName, MAX_NAME_LENGTH);
  const email = sanitizeString(body.email, 320);

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const existing = await prisma.betaSignup.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ message: 'This email is already registered.' }, { status: 409 });
    }

    await prisma.betaSignup.create({
      data: { firstName, lastName, email },
    });

    return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating beta signup:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
