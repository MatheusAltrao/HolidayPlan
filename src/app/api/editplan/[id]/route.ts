import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const planId = params.id;

    const { title, origin, destiny, participants, startDate, endDate, budget, description } =
        await req.json();

    try {
        await prismaClient.plans.update({
            where: {
                id: planId as string,
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
        return NextResponse.json({ message: 'Updated  plan' });
    } catch (error) {
        return NextResponse.json(
            { error: 'An error occurred while updating the plan.' },
            { status: 500 },
        );
    }
}
