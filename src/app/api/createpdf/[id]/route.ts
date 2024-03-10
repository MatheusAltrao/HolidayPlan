import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get('id');

    const trip = await prismaClient.trips.findFirst({
        where: {
            id: tripId as string,
        },
    });

    try {
        return NextResponse.json({ trip: trip }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'bad request' }, { status: 400 });
    }
}
