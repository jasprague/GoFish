import { prisma } from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email } = body;

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
  }

  try {
    const existing = await prisma.betaSignup.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ message: 'This email is already registered.' }, { status: 409 });
    }

    const signup = await prisma.betaSignup.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });

    return NextResponse.json({ message: 'User created successfully!', user: signup }, { status: 200 });
  } catch (error) {
    console.error('Error creating beta signup:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
