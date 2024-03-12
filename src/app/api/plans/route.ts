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

    if (!planId) {
        return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    try {
        const existingPlan = await prismaClient.plans.findUnique({
            where: { id: planId },
        });

        if (!existingPlan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }

        await prismaClient.plans.delete({
            where: {
                id: planId as string,
            },
        });

        return NextResponse.json({ message: 'Plan deleted successfully!' });
    } catch (error) {
        console.error('Failed to delete plan:', error);
        return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    try {
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

        return NextResponse.json({ message: 'Plan created successfully' });
    } catch (error) {
        console.error('Failed to create new plan:', error);
        return NextResponse.json({ error: 'Failed to create new plan' }, { status: 500 });
    }
}
