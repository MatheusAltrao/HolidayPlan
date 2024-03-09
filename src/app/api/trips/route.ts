import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const { title, local, participants, startDate, endDate, budget, description, userId } =
        await req.json();

    try {
        await prismaClient.trips.create({
            data: {
                title,
                local,
                participants,
                startDate,
                endDate,
                budget,
                description,
                userId,
            },
        });

        return NextResponse.json({ message: 'Create new trip' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed create new trip' }, { status: 400 });
    }
}
