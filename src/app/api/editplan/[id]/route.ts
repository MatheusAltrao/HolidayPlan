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

    try {
        const { title, origin, destiny, participants, startDate, endDate, budget, description } =
            await req.json();

        const existingPlan = await prismaClient.plans.findUnique({
            where: { id: planId as string },
        });

        if (!existingPlan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }

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
        return NextResponse.json({ message: 'Plan updated successfully' });
    } catch (error) {
        console.error('Error updating plan:', error);
        return NextResponse.json(
            { error: 'An error occurred while updating the plan.' },
            { status: 500 },
        );
    }
}
