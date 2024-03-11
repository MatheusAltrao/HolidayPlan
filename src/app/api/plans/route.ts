import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('id');

    try {
        await prismaClient.plans.delete({
            where: {
                id: planId as string,
            },
        });

        return NextResponse.json({ message: 'Plan deleted successfully!' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed delete plan' }, { status: 400 });
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
        await prismaClient.plans.create({
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

        return NextResponse.json({ message: 'Create new plan' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed create new plan' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('id');

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
        return console.log(error);
    }
}
