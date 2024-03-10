import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get('id');

    try {
        await prismaClient.trips.delete({
            where: {
                id: tripId as string,
            },
        });

        return NextResponse.json({ message: 'Trip deleted successfully!' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed delete trip' }, { status: 400 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const {
        title,
        origin,
        destiny,
        participants,
        startDate,
        endDate,
        budget,
        description,
        userId,
    } = await req.json();

    try {
        await prismaClient.trips.create({
            data: {
                title,
                origin,
                destiny,
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

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get('id');

    const { title, origin, destiny, participants, startDate, endDate, budget, description } =
        await req.json();

    try {
        await prismaClient.trips.update({
            where: {
                id: tripId as string,
            },
            data: {
                title,
                origin,
                destiny,
                participants,
                startDate,
                endDate,
                budget,
                description,
            },
        });
        return NextResponse.json({ message: 'Updated  trip' });
    } catch (error) {
        return console.log(error);
    }
}
