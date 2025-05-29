import { prisma } from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const body = await req.json();
  const { firstName, lastName, email } = body;

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
  }

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'This email is already registered.' }, { status: 409 }); // 409 Conflict
    }


    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });

    return NextResponse.json({ message: 'User created successfully!', user }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}